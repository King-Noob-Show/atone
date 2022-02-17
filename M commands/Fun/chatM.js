const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const {
  default: { request },
} = require("axios");
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = {
  name: "chat",
  description: "Chat with a chatbot!",
  aliases: ["cb"],
  category: "Fun",
  usage: ">>chat <message>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const uuid = message.member.id;
    const msg = args.join(" ");

    if (!msg) return message.reply("Please provide a valid message!");

    const options = {
      method: "GET",
      url: `${base}fun/chatbot${token}&message=${msg}&uuid=${uuid}`,
    };

    const res = await request(options);

    const reply = res.data.reply;

    message.channel.send(`${reply}`);
  },
};
