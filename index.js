const { Client, Collection } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: 32767,
});

module.exports = client;

//MongoDB
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOOSE)
  .then(() => {
    console.log("Connected To MongoDB!");
  })
  .catch((e) => {
    console.log(e);
  });

const ee = require("./settings/embed.json");
const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
// Global Variables
client.mcategories = fs.readdirSync("./M commands");
client.mcommands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.Commands = new Collection();
client.categories = fs.readdirSync("./Commands/");

// Initializing the project
//Loading files, with the client variable like Command Handler, Event Handler, ...
["event_handler", "slash_handler", "message_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.login(token);

process.on("unhandledRejection", (reason, p) => {
  console.log(" [Error_Handling] :: Unhandled Rejection/Catch");
  console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch");
  console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.log(" [Error_Handling] :: Uncaught Exception/Catch (MONITOR)");
  console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
  console.log(" [Error_Handling] :: Multiple Resolves");
  console.log(type, promise, reason);
});
