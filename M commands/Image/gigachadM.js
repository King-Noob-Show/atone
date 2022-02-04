const { Client, Message, MessageAttachment } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;
const Canvas = require("canvas");

module.exports = {
  name: "gigachad",
  description: "GIGA CHAD DAMN!!",
  aliases: ["gc"],
  category: "Image",
  usage: ">>gigachad [user] [normal or god]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    // 500 by 625
    const user = message.mentions.members.first() || message.member;
    const av = user.displayAvatarURL({ format: "jpg", dynamic: true });

    let type;

    if (args[1]) {
      if (args[1] === "normal" || args[1] === "god") {
        type = args[1];
      }
    } else if (args[0]) {
      if (args[0] === "normal" || args[0] === "god") {
        type = args[0];
      }
    } else if (
      args[0] !== "normal" ||
      args[0] !== "god" ||
      args[1] !== "normal" ||
      args[1] !== "god"
    ) {
      type = "normal";
    } else {
      type = "normal";
    }

    if (type === undefined) {
      type = "normal";
    }

    const url = `${base}image/gigachad${token}&image=${av}&type=${type}`;

    const canva = Canvas.createCanvas(500, 625);

    const bg = await Canvas.loadImage(url);

    const ctx = canva.getContext("2d");
    ctx.drawImage(bg, 0, 0, canva.width, canva.height);

    const attachment = new MessageAttachment(canva.toBuffer());

    message.channel.send({ files: [attachment] });
  },
};
