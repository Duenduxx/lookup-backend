const { Client, GatewayIntentBits } = require("discord.js");
const TOKEN = process.env.BOT_TOKEN;

console.log("BOT_TOKEN =", TOKEN ? "OK" : "UNDEFINED");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on("clientReady", () => {

    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.login(TOKEN).catch(err => {
    console.error("Erreur de connexion Discord :", err);
});
