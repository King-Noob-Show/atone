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
  name: "catfact",
  description: "A random catfact!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/catfact",

  run: async ({ client, interaction, args }) => {
    const fact = await get(`${base}fun/catfact${token}`);
    const embed = new MessageEmbed()
      .setTitle("Random Catfact!")
      .setDescription(`**${fact.data.fact}**`)
      .setTimestamp()
      .setColor("AQUA");

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
