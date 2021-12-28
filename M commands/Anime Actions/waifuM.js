const { Client, Message, MessageAttachment } = require("discord.js");
import fetch from "node-fetch";
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "waifu",
  description: "Generate a Waifu!",
  aliases: ["waifugen"],
  category: "Anime Actions",
  usage: ">>waifu",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const img = await fetch(
      `http://api.notzerotwo.ml/image/waifugenerator?api=${process.env.API}`
    );

    const attach = new MessageAttachment(img, "waifu.png");

    message.channel.send({ attachments: attach });
  },
};
