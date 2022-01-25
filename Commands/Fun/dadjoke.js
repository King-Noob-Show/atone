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
  name: "dadjoke",
  description: "A really bad joke.",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/dadjoke",

  run: async ({ client, interaction, args }) => {
    const res = await get(`${base}fun/dadjoke${token}`).catch((e) => {
      if (interaction.user.id === process.env.OWNER_ID) {
        interaction.followUp("Bruh an error occured.");
        interaction.user.send(e);
      } else {
        interaction.followUp("An error occured. Sorry!");
      }
    });

    const dj = res.data.joke;
    const embed = new MessageEmbed()
      .setTitle("Dad Joke")
      .setDescription(dj)
      .setColor("AQUA")
      .setTimestamp();

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
