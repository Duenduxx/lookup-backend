const { Client, GatewayIntentBits } = require("discord.js");
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on("clientReady", () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.login(TOKEN);
