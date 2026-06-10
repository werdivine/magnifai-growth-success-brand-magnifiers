const { initClient, getClient } = require('./core/bot_engine');
const { Api } = require('telegram');

async function test() {
    console.log("Initializing client...");
    const client = await getClient();
    console.log("Client connected!");

    const keyword = "AI";
    console.log(`Searching for "${keyword}"...`);
    const results = await client.invoke(
        new Api.contacts.Search({
            q: keyword,
            limit: 5,
        })
    );

    console.log("Results chats length:", results.chats.length);
    for (let i = 0; i < Math.min(results.chats.length, 5); i++) {
        const chat = results.chats[i];
        console.log(`\nChat #${i + 1}:`);
        console.log(`Class name: ${chat.className}`);
        console.log(`ID: ${chat.id}`);
        console.log(`Title: ${chat.title}`);
        console.log(`Username: ${chat.username}`);
        console.log(`Megagroup: ${chat.megagroup}`);
        console.log(`Broadcast: ${chat.broadcast}`);
        console.log(`Participants count: ${chat.participantsCount}`);
        console.log(`Keys:`, Object.keys(chat));
    }
}

test().catch(console.error);
