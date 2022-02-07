const { Command } = require("reconlx");
const { MessageAttachment } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;
const Canvas = require("canvas");

module.exports = new Command({
  name: "panik",
  description: "PANIK.....KALM.....PANIK!!!!!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Image",
  usage: "/panik <panik1> <kalm> <panik2>",
  options: [
    {
      name: "panik1",
      description: "Argument for the first panik picture.",
      type: "STRING",
      required: true,
    },
    {
      name: "kalm",
      description: "Argument for the kalm picture.",
      type: "STRING",
      required: true,
    },
    {
      name: "panik2",
      description: "Argument for the second panik picture.",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const p1 = interaction.options.getString("panik1");
      const k = interaction.options.getString("kalm");
      const p2 = interaction.options.getString("panik2");

      const canvas = Canvas.createCanvas(640, 881);
      const ctx = canvas.getContext("2d");

      const image = await Canvas.loadImage(
        `${base}image/panik-kalm${token}&panik1=${p1}&kalm=${k}&panik2=${p2}`
      ).catch(() => {
        return interaction.followUp("An error occured! Please try again!");
      });

      if (image) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }

      const attach = new MessageAttachment(canvas.toBuffer(), "panik.png");

      await interaction.followUp("Loading...");
      await interaction.deleteReply();
      await interaction.channel.send({ files: [attach] });
    } catch (e) {
      if (interaction.user.id === process.env.OWNER_ID) {
        interaction.followUp(e.message);
      } else {
        interaction.followUp("An error occured! Please try again!");
      }
    }
  },
});
