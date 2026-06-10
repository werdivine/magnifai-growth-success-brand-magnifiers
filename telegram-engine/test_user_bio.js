const { getClient } = require('./core/bot_engine');
const { Api } = require('telegram');

async function test() {
    console.log("Connecting client...");
    const client = await getClient();
    console.log("Connected!");

    const me = await client.getMe();
    console.log(`Logged in as: ${me.firstName} (ID: ${me.id})`);

    console.log("Fetching full profile details...");
    const result = await client.invoke(
        new Api.users.GetFullUser({
            id: me.id,
        })
    );
    
    console.log("Fetched full profile!");
    console.log("Bio/About field:", result.fullUser.about);
}

test().catch(console.error);
