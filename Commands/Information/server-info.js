const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ee = require("../../settings/embed.json");

module.exports = new Command({
  name: "server-info",
  description: "Get information about the server.",
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  usage: "/server-info",

  run: async ({ client, interaction, args }) => {
    const sc = interaction.guild.createdTimestamp / 1000;
    const sd = Math.round(sc);
    const t = interaction.guild.afkTimeout / 60;
    const time = Math.round(t);
    const partnered = {
      false: "No",
      true: "Yes",
    };
    const verified = {
      false: "No",
      true: "Yes",
    };
    const embed = new MessageEmbed()
      .setTitle(`Server Info of ${interaction.guild.name}`)
      .addFields(
        {
          name: "Server name",
          value: `${interaction.guild.name}`,
          inline: true,
        },
        {
          name: "Server ID",
          value: `${interaction.guild.id}`,
          inline: true,
        },
        {
          name: "Owner",
          value: `${
            interaction.guild.members.cache.get(interaction.guild.ownerId).user
              .tag
          }`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${
            interaction.guild.channels.cache.filter(
              (channel) => channel.type == "GUILD_TEXT"
            ).size
          } Text channels\n${
            interaction.guild.channels.cache.filter(
              (channel) => channel.type == "GUILD_VOICE"
            ).size
          } Voice channels`,
          inline: true,
        },
        {
          name: "Created on",
          value: `<t:${sd}>\n(<t:${sd}:R>)`,
          inline: true,
        },
        {
          name: "No. of roles",
          value: `${interaction.guild.roles.cache.size - 1 ?? "None"} Roles`,
          inline: true,
        },
        {
          name: "Total members",
          value: `${interaction.guild.memberCount} Members`,
          inline: true,
        },
        {
          name: "AFK channel",
          value: `${interaction.guild.afkChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "AFK timeout",
          value: `${time} minutes`,
          inline: true,
        },
        {
          name: "Server features",
          value: `${interaction.guild.features}`,
          inline: true,
        },
        {
          name: "Server Boost level",
          value: `${interaction.guild.premiumTier}`,
          inline: true,
        },
        {
          name: "Total boosts",
          value: `${interaction.guild.premiumSubscriptionCount} Boosts`,
          inline: true,
        },
        {
          name: "Rules channel",
          value: `${interaction.guild.rulesChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "System channel",
          value: `${interaction.guild.systemChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "Verification level",
          value: `${interaction.guild.verificationLevel}`,
          inline: true,
        },
        {
          name: "Partnered server",
          value: partnered[interaction.guild.partnered],
          inline: true,
        },
        {
          name: "Verified server",
          value: verified[interaction.guild.verified],
          inline: true,
        }
      )
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp();

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
