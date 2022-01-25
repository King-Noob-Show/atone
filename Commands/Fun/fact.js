const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const {
  default: { get },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = new Command({
  name: "fact",
  description: "FACT",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/fact",

  run: async ({ client, interaction, args }) => {
    const res = await get(`${base}fun/fact${token}`);
    const embed = new MessageEmbed()
      .setTitle("FACT!")
      .setDescription(`**${res.data.fact}**`)
      .setColor("AQUA")
      .setTimestamp();

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
