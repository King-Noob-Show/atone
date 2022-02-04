const { Command } = require("reconlx");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = new Command({
  name: "gigachad",
  description: "GIGA CHAD DAMN!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Image",
  usage: "/gigachad [user] [type]",
  options: [
    {
      name: "user",
      description: "GIGA CHAD USER",
      type: "USER",
      required: false,
    },
    {
      name: "type",
      description: "Type of the giga chad (can only be normal or god)",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getMember("user") || interaction.member;
    const av = user.displayAvatarURL({ format: "jpg", dynamic: true });

    let type;

    if (interaction.options.getString("type")) {
      if (
        interaction.options.getString("type") === "normal" ||
        interaction.options.getString("type") === "god"
      ) {
        type = interaction.options.getString("type");
      } else if (
        interaction.options.getString("type") !== "normal" ||
        interaction.options.getString("type") !== "god"
      ) {
        type = "normal";
      }
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

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ files: [attachment] });
  },
});
