/**
 * Lead Scraper Module
 *
 * Scrapes active members from joined groups, qualifies them
 * by bio keywords and activity, scores each lead 1–10, and
 * stores results in leads_db.json.
 */

const { Api } = require('telegram');
const logger = require('../utils/logger');
const db = require('../utils/db');
const { humanDelay, withBackoff } = require('../safety/rate_limiter');

const QUALIFIER_KEYWORDS = [
    'founder', 'ceo', 'cto', 'cmo', 'vp', 'head of', 'director',
    'marketing', 'growth', 'saas', 'startup', 'agency', 'consultant',
    'entrepreneur', 'b2b', 'ecommerce', 'e-commerce', 'product',
    'ai', 'automation', 'scale', 'revenue', 'sales', 'lead gen',
];

const BOT_SIGNALS = [
    'bot', 'channel', '🤖', 'admin', 'support@',
];

const DISQUALIFIER_KEYWORDS = [
    'crypto trader', 'forex', 'airdrop', 'nft', 'defi', 'signals',
];

/**
 * Score a Telegram user profile as a lead (1–10)
 */
function scoreLead(user) {
    let score = 0;

    if (!user.bio && !user.firstName) return 1;

    const text = `${user.firstName || ''} ${user.lastName || ''} ${user.bio || ''}`.toLowerCase();

    // Positive signals
    QUALIFIER_KEYWORDS.forEach(kw => {
        if (text.includes(kw)) score += 1;
    });

    // Has a bio
    if (user.bio && user.bio.length > 20) score += 2;

    // Has a username (can be DM'd reliably)
    if (user.username) score += 2;

    // Has profile photo
    if (user.photo) score += 1;

    // Disqualifiers
    DISQUALIFIER_KEYWORDS.forEach(kw => {
        if (text.includes(kw)) score -= 3;
    });

    // Bot detection
    if (user.bot) score = -99;
    BOT_SIGNALS.forEach(sig => {
        if (text.includes(sig)) score -= 5;
    });

    return Math.max(1, Math.min(10, score));
}

/**
 * Determine if a user is a bot
 */
function isBot(user) {
    if (user.bot) return true;
    const text = `${user.firstName || ''} ${user.username || ''} ${user.bio || ''}`.toLowerCase();
    return BOT_SIGNALS.some(sig => text.includes(sig));
}

/**
 * Get members of a group
 */
async function getGroupMembers(client, group, limit = 200) {
    const target = group.username ? group.username : new Api.InputPeerChat({ chatId: BigInt(group.id) });

    return await withBackoff(async () => {
        const result = await client.invoke(
            new Api.channels.GetParticipants({
                channel: target,
                filter: new Api.ChannelParticipantsRecent(),
                offset: 0,
                limit,
                hash: BigInt(0),
            })
        );
        return result.users || [];
    });
}

/**
 * Get full user bio using GetFullUser API call
 */
async function getUserBio(client, user) {
    try {
        const target = user.username ? `@${user.username}` : user.id;
        // GramJS requires a tiny pause to avoid hitting rate limits too fast
        await new Promise(r => setTimeout(r, 250));
        const result = await withBackoff(async () => {
            return await client.invoke(
                new Api.users.GetFullUser({
                    id: target,
                })
            );
        });
        if (result && result.fullUser) {
            return result.fullUser.about || '';
        }
    } catch (e) {
        logger.debug(`Could not fetch bio details for ${user.username || user.id}: ${e.message}`);
    }
    return '';
}

/**
 * Main run function
 */
async function run(client, config) {
    const groupsData = db.read('groups_db');
    const leadsData = db.read('leads_db');
    const contactedData = db.read('contacted_db');

    const allGroups = groupsData.groups || [];
    const joinedGroups = allGroups.filter(g => g.joined);
    const existingLeadIds = new Set((leadsData.leads || []).map(l => l.id));
    const contactedIds = new Set((contactedData.contacts || []).map(c => c.user_id));

    const scoreThreshold = config.lead_score_threshold || 5;
    let totalNew = 0;

    for (const group of joinedGroups) {
        logger.info(`Scraping members from: ${group.title}`);

        try {
            const users = await getGroupMembers(client, group);
            logger.info(`Got ${users.length} members from ${group.title}`);

            let groupNew = 0;
            for (const user of users) {
                if (!user.id) continue;
                const userId = String(user.id);

                if (existingLeadIds.has(userId)) continue;
                if (contactedIds.has(userId)) continue;
                if (isBot(user)) continue;
                if (user.deleted) continue;
                if (!user.username && !user.phone) continue; // Can't contact

                // Fetch full user details to get bio/about info
                const bio = await getUserBio(client, user);

                const score = scoreLead({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    bio: bio,
                    username: user.username,
                    photo: user.photo,
                    bot: user.bot,
                });

                if (score < scoreThreshold) continue;

                const lead = {
                    id: userId,
                    username: user.username || null,
                    first_name: user.firstName || '',
                    last_name: user.lastName || '',
                    bio: bio || '',
                    phone: user.phone || null,
                    score,
                    source_group: group.title,
                    source_group_id: group.id,
                    discovered_at: new Date().toISOString(),
                    status: 'new',
                    dm_sequence_step: 0,
                    last_contacted: null,
                    conversation_state: 'none',
                    notes: [],
                };

                leadsData.leads = leadsData.leads || [];
                leadsData.leads.push(lead);
                existingLeadIds.add(userId);
                groupNew++;
                totalNew++;
            }

            group.leads_scraped = (group.leads_scraped || 0) + groupNew;
            
            // Persist progress immediately after each group is successfully scraped
            leadsData.last_updated = new Date().toISOString();
            leadsData.total = leadsData.leads.length;
            db.write('leads_db', leadsData);
            db.write('groups_db', { ...groupsData, groups: allGroups, last_updated: new Date().toISOString() });

            await humanDelay(config);
        } catch (err) {
            logger.error(`Failed to scrape ${group.title}: ${err.message}`);
        }
    }

    logger.info(`Lead scraping complete. New leads: ${totalNew}`);
    return { new_leads: totalNew, total: leadsData.leads.length };
}

module.exports = { run, scoreLead };
