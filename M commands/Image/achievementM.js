const { Client, Message, MessageAttachment } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const canvas = require("canvas");

module.exports = {
  name: "achievement",
  description: "A minecraft achievement.",
  aliases: ["achieve"],
  category: "Image",
  usage: ">>achievement <message>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const m = args.join(" ");

    if (!m) return message.reply("Please provide a message!");

    const canva = canvas.createCanvas(320, 64);
    const context = canva.getContext("2d");

    const bg = await canvas.loadImage(
      `https://api.notzerotwo.ml/image/achievement?api=${process.env.API2}&text=${m}`
    );

    context.drawImage(bg, 0, 0, canva.width, canva.height);

    const attach = new MessageAttachment(canva.toBuffer(), "achievement.png");

    message.channel.send({ files: [attach] });
  },
};
