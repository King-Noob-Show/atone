const { Command } = require("reconlx");
const { MessageAttachment } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const canvas = require("canvas");

module.exports = new Command({
  name: "achievement",
  description: "Get an achievement",
  userPermissions: ["ATTACH_FILES"],
  category: "Fun",
  usage: "/achievement <text>",
  options: [
    {
      name: "text",
      description: "Text for the achievement.",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const m = interaction.options.getString("text");

    const canva = canvas.createCanvas(320, 64);
    const context = canva.getContext("2d");

    const bg = await canvas.loadImage(
      `https://api.notzerotwo.ml/image/achievement?api=${process.env.API2}&text=${m}`
    );

    context.drawImage(bg, 0, 0, canva.width, canva.height);

    const attach = new MessageAttachment(canva.toBuffer(), "achievement.png");

    await interaction.followUp({ content: "Loading..." });
    await interaction.deleteReply();
    await interaction.channel.send({ files: [attach] });
  },
});
