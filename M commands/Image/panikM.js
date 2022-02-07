const { Client, Message, MessageAttachment } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;
const Canvas = require("canvas");

module.exports = {
  name: "panik",
  description: "PANIK.......KALM......PANIK.......",
  aliases: ["pkp"],
  category: "Image",
  usage: ">>panik -p <panik1> -k <kalm> -p2 <panik2>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    //640 by 881
    //panik1, kalm, panik2 [panik-kalm] [image]
    try {
      const arg = args.join(" ");
      const p1 = "-p";
      const k = "-k";
      const p2 = "-p2";

      const p1v2 = arg.slice(arg.indexOf(p1) + p1.length);
      const p1v3 = p1v2.substring(0, p1v2.lastIndexOf(k) + k.length);
      const p1v4 = p1v3.slice(0, p1v3.length - k.length);
      const p1v5 = p1v4.substring(1);

      const kv2 = arg.slice(arg.indexOf(k) + k.length);
      const kv3 = kv2.substring(0, kv2.lastIndexOf(p2) + p2.length);
      const kv4 = kv3.slice(0, kv3.length - p2.length);
      const kv5 = kv4.substring(1);

      const p2v2 = arg.slice(arg.indexOf(p2) + p2.length);
      const p2v3 = p2v2.substring(1);

      if (!args) {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      }
      if (!p1v2) {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      }
      if (!kv2) {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      }
      if (!p2v2) {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      }

      const canvas = Canvas.createCanvas(640, 881);
      const ctx = canvas.getContext("2d");

      const image = await Canvas.loadImage(
        `${base}image/panik-kalm${token}&panik1=${p1v5}&kalm=${kv5}&panik2=${p2v3}`
      ).catch(() => {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      });

      if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }

      const attach = new MessageAttachment(canvas.toBuffer(), "panik.png");

      message.channel.send({ files: [attach] }).catch(() => {
        return message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      });
    } catch (e) {
      if (message.author.id === process.env.OWNER_ID) {
        message.channel.send(e.message);
      } else {
        message.reply(
          "Please provide valid arguments!\n***Usage:*** `>>panik -p <panik1> -k <kalm> -p2 <panik2>`"
        );
      }
    }
  },
};
