/**
 * DM Reply Handler Module
 *
 * Checks for incoming messages from prospects who are in outreach sequences,
 * classifies their responses, and sends intelligent automated auto-replies
 * or AI-generated responses while updating sequence statuses.
 */

const OpenAI = require('openai');
const { Api } = require('telegram');
const logger = require('../utils/logger');
const db = require('../utils/db');
const { canPerformAction, recordAction, humanDelay, humaniseText, withBackoff } = require('../safety/rate_limiter');

let openai = null;

function getOpenAI(config) {
    if (!openai) {
        openai = new OpenAI({ 
            apiKey: config.openai_api_key,
            baseURL: config.openai_base_url || undefined
        });
    }
    return openai;
}

const OBJECTION_RESPONSES = {
    not_interested: `Totally fair! If your situation ever changes and you want to explore AI-powered growth systems, we're here. Best of luck with everything! 🙌`,
    busy: `No worries at all — I know how hectic things get. I'll leave you to it. Feel free to reach out whenever the time is right.`,
    how_much: `Great question! Our packages start at £3,500/month for a full AI growth system. Most clients see 3–5x ROI within 90 days. Want me to send over a quick breakdown?`,
};

/**
 * Detect reply intent type
 */
function classifyReply(text) {
    const lower = text.toLowerCase();
    if (/not interest|no thanks|stop|unsubscribe|remove me/i.test(lower)) return 'not_interested';
    if (/busy|not right now|later|bad time/i.test(lower)) return 'busy';
    if (/how much|price|cost|pricing|rates/i.test(lower)) return 'how_much';
    if (/tell me more|sounds interesting|interested|curious|learn more/i.test(lower)) return 'tell_me_more';
    return 'default';
}

/**
 * Generate a personalized AI response to a reply
 */
async function generateReplyResponse(lead, replyText, config) {
    try {
        const ai = getOpenAI(config);
        const response = await ai.chat.completions.create({
            model: config.openai_model || 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a friendly, knowledgeable growth consultant at ${config.brand_name || 'WeMagnifAI'}, a ${config.niche} agency.
You're having a Telegram DM conversation with a prospect who has replied to your outreach. Be helpful, genuine, and non-pushy.
Keep responses concise (2-4 sentences max for Telegram). Your goal is to offer a free 20-min strategy call.
Website: ${config.website_url}`,
                },
                {
                    role: 'user',
                    content: `The prospect (${lead.first_name} ${lead.last_name}, Bio: ${lead.bio || 'Not available'}) replied: "${replyText}"\n\nWrite a natural, helpful reply.`,
                },
            ],
            temperature: 0.8,
            max_tokens: 200,
        });

        return response.choices[0].message.content.trim();
    } catch (err) {
        logger.error(`OpenAI response generation failed: ${err.message}`);
        return `Thanks for the message! I'd love to share more details about what we do at ${config.brand_name}. Is there a good time for a quick 10-minute call this week?`;
    }
}

/**
 * Get recent messages in a direct chat
 */
async function getDirectMessages(client, lead) {
    const target = lead.username ? `@${lead.username}` : parseInt(lead.id);
    return await withBackoff(async () => {
        // GramJS getMessages fetches the latest messages from the chat
        const messages = await client.getMessages(target, { limit: 10 });
        return messages || [];
    });
}

/**
 * Send a reply message
 */
async function sendOutboundReply(client, lead, text) {
    const target = lead.username ? `@${lead.username}` : parseInt(lead.id);
    return await withBackoff(async () => {
        return await client.sendMessage(target, {
            message: humaniseText(text),
        });
    });
}

/**
 * Main run function
 */
async function run(client, config) {
    logger.info('Running DM Reply Handler Module...');
    
    const leadsData = db.read('leads_db');
    const contactedData = db.read('contacted_db');
    const analyticsData = db.read('analytics');

    const leads = leadsData.leads || [];
    const contacts = contactedData.contacts || [];

    // Filter leads that are currently active in sequence
    const activeLeads = leads.filter(l => l.status === 'in_sequence');
    logger.info(`Checking replies for ${activeLeads.length} active sequence leads...`);

    let repliesDetected = 0;

    for (const lead of activeLeads) {
        try {
            const messages = await getDirectMessages(client, lead);
            if (!messages || messages.length === 0) continue;

            // Find any incoming message (not sent by us)
            const incomingMsg = messages.find(m => !m.out && m.message);

            if (incomingMsg) {
                const replyText = incomingMsg.message.trim();
                const replyDate = new Date(incomingMsg.date * 1000);

                let contact = contacts.find(c => c.user_id === lead.id);
                const alreadyProcessed = contact && contact.messages && contact.messages.some(
                    m => m.type === 'received' && m.message === replyText
                );

                if (!alreadyProcessed) {
                    logger.info(`Detected new reply from @${lead.username || lead.id}: "${replyText.slice(0, 50)}..."`);
                    repliesDetected++;

                    const intent = classifyReply(replyText);
                    logger.info(`Classified reply intent as: ${intent}`);

                    let response = '';
                    if (intent === 'not_interested') {
                        response = OBJECTION_RESPONSES.not_interested;
                        lead.status = 'not_interested';
                        lead.conversation_state = 'opted_out';
                    } else if (intent === 'busy') {
                        response = OBJECTION_RESPONSES.busy;
                        lead.status = 'paused';
                        lead.conversation_state = 'busy';
                    } else if (intent === 'how_much') {
                        response = OBJECTION_RESPONSES.how_much;
                        lead.status = 'replied';
                        lead.conversation_state = 'pricing_inquiry';
                    } else {
                        // generate custom AI response
                        response = await generateReplyResponse(lead, replyText, config);
                        lead.status = 'replied';
                        lead.conversation_state = 'interested';
                    }

                    // Send the auto-response or AI response
                    logger.info(`Sending response: "${response.slice(0, 50)}..."`);
                    await sendOutboundReply(client, lead, response);

                    // Update lead stats
                    lead.last_contacted = new Date().toISOString();

                    // Update contacted_db.json logs
                    if (!contact) {
                        contact = {
                            user_id: lead.id,
                            username: lead.username,
                            messages: [],
                            first_contacted: new Date().toISOString(),
                        };
                        contacts.push(contact);
                    }

                    // Log both the incoming reply and our outgoing response
                    contact.messages.push({
                        type: 'received',
                        received_at: replyDate.toISOString(),
                        message: replyText,
                    });
                    contact.messages.push({
                        type: 'replied',
                        sent_at: new Date().toISOString(),
                        message: response,
                        intent_classified: intent,
                    });

                    // Update analytics counters
                    recordAction('dms'); // counts towards messages sent
                    recordAction('messages');

                    await humanDelay(config);
                }
            }
        } catch (err) {
            logger.error(`Error processing reply for @${lead.username || lead.id}: ${err.message}`);
        }
    }

    // Save database updates
    db.write('leads_db', { ...leadsData, leads, last_updated: new Date().toISOString() });
    db.write('contacted_db', { ...contactedData, contacts, last_updated: new Date().toISOString() });

    // Update analytics replies received dynamically!
    // Compute total unique contacts who actually sent us a message
    const uniqueReplies = contacts.filter(c => {
        return c.messages && c.messages.some(m => m.type === 'received');
    }).length;

    const totals = analyticsData.totals || {};
    totals.replies_received = uniqueReplies;
    db.write('analytics', { ...analyticsData, totals, last_updated: new Date().toISOString() });

    logger.info(`DM Reply Handler complete. New replies handled: ${repliesDetected}`);
    return { replies_handled: repliesDetected };
}

module.exports = { run, classifyReply, generateReplyResponse };
