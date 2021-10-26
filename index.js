//Require the modules lol
const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
//Calling dotenv i guess.....
dotenv.config()

//Creating a new client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
    console.log ("I think This is working")
});

client.login(process.env.TOKEN);