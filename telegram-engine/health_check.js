/**
 * Quick health check for the Telegram Engine session and connectivity
 */
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const fs = require('fs');
const path = require('path');

const SESSION_PATH = path.join(__dirname, 'data', 'session.txt');
const CONFIG_PATH = path.join(__dirname, 'config.json');

(async () => {
    try {
        const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
        const savedSession = fs.existsSync(SESSION_PATH)
            ? fs.readFileSync(SESSION_PATH, 'utf-8').trim()
            : '';

        if (!savedSession) {
            console.log('❌ ERROR: No saved session found. Run `npm run auth` first.');
            process.exit(1);
        }

        console.log('✓ Session file exists (' + savedSession.length + ' chars)');
        console.log('✓ Config loaded — API ID: ' + config.telegram_api_id);

        const session = new StringSession(savedSession);
        const client = new TelegramClient(session, config.telegram_api_id, config.telegram_api_hash, {
            connectionRetries: 3,
            useWSS: false,
        });

        console.log('⏳ Connecting to Telegram...');
        await client.connect();

        const me = await client.getMe();
        console.log('✓ Connected as: ' + (me.firstName || '') + ' ' + (me.lastName || '') + ' (@' + (me.username || 'no username') + ')');
        console.log('✓ Phone: ' + me.phone);
        console.log('✓ User ID: ' + me.id);

        // Check groups db
        const groupsPath = path.join(__dirname, 'data', 'groups_db.json');
        const leadsPath = path.join(__dirname, 'data', 'leads_db.json');
        
        if (fs.existsSync(groupsPath)) {
            const groups = JSON.parse(fs.readFileSync(groupsPath, 'utf-8'));
            const totalGroups = Array.isArray(groups) ? groups.length : (groups.groups ? groups.groups.length : 0);
            console.log('✓ Groups DB: ' + totalGroups + ' groups tracked');
        }
        
        if (fs.existsSync(leadsPath)) {
            const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf-8'));
            const totalLeads = Array.isArray(leads) ? leads.length : (leads.leads ? leads.leads.length : 0);
            console.log('✓ Leads DB: ' + totalLeads + ' leads captured');
        }

        await client.disconnect();
        console.log('\n✅ TELEGRAM ENGINE HEALTH CHECK: ALL SYSTEMS GO');
        process.exit(0);
    } catch (err) {
        console.error('❌ Health check failed:', err.message);
        if (err.message.includes('AUTH_KEY') || err.message.includes('SESSION')) {
            console.log('   → Session may be expired. Run `npm run auth` to re-authenticate.');
        }
        process.exit(1);
    }
})();
