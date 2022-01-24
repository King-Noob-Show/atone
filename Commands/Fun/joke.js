const { Command } = require("reconlx");
const Memer = require("random-jokes-api");
const dotenv = require("dotenv");
const ee = require("../../settings/embed.json");
const { MessageEmbed } = require("discord.js");
dotenv.config();

module.exports = new Command({
  name: "joke",
  description: "Tells a random joke",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/joke",

  run: async ({ client, interaction, args }) => {
    const joke = Memer.joke();
    const embed = new MessageEmbed()
      .setTitle("Random Joke")
      .setColor("AQUA")
      .setDescription(joke);

    if (interaction.member.user.id === process.env.OWNER_ID)
      return interaction.followUp({
        content: "Hello My Owner! Heres a random joke!",
        embeds: [embed],
        ephemeral: false,
      });

    await interaction.followUp({ embeds: [embed] });
  },
});
