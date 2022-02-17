const { Command } = require("reconlx");
const dotenv = require("dotenv");
const { MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json");
dotenv.config();

module.exports = new Command({
  name: "membercount",
  description: "Displays the server's membercount.",
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  usage: "/membercount",
  run: async ({ client, interaction, args }) => {
    const embed = new MessageEmbed()
      .setTitle(`Member Count of ${interaction.guild.name}`)
      .setColor("AQUA")
      .setDescription(`${interaction.guild.memberCount}`)
      .setTimestamp();

    if (interaction.user.id === process.env.OWNER_ID)
      return interaction.followUp({
        content: `Hello My Owner! How are you? Here's the membercount!`,
        embeds: [embed],
        ephemeral: false,
      });

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
