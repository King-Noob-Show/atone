const { Client, Message, MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  name: "simpcard",
  description: "Generate a simp card.",
  aliases: ["scard"],
  category: "Image",
  usage: ">>simpcard [user]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/765926464628719627/855686984042938368/Simp_Pop_Cat.png"
    );

    const canvas = Canvas.createCanvas(775, 575);
    const ctx = canvas.getContext(`2d`);

    ctx.drawImage(bg, 0, 0, 775, 575);
    ctx.drawImage(avatar, 30, 50, 303, 455);

    const attachment = new MessageAttachment(canvas.toBuffer(), "simpcard.jpg");
    message.channel.send({ files: [attachment] });
  },
};
