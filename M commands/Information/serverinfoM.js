const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
const ee = require("../../settings/embed.json");

module.exports = {
  name: "serverinfo",
  description: "Tells yopu the info of the current server!",
  aliases: ["server"],
  category: "Information",
  usage: ">>serverinfo",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const sc = message.guild.createdTimestamp / 1000;
    const sd = Math.round(sc);
    const t = message.guild.afkTimeout / 60;
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
      .setTitle(`Server Info of ${message.guild.name}`)
      .addFields(
        {
          name: "Server name",
          value: `${message.guild.name}`,
          inline: true,
        },
        {
          name: "Server ID",
          value: `${message.guild.id}`,
          inline: true,
        },
        {
          name: "Owner",
          value: `${
            message.guild.members.cache.get(message.guild.ownerId).user.tag
          }`,
          inline: true,
        },
        {
          name: "Channels",
          value: `${
            message.guild.channels.cache.filter(
              (channel) => channel.type == "GUILD_TEXT"
            ).size
          } Text channels\n${
            message.guild.channels.cache.filter(
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
          value: `${message.guild.roles.cache.size - 1 ?? "None"} Roles`,
          inline: true,
        },
        {
          name: "Total members",
          value: `${message.guild.memberCount} Members`,
          inline: true,
        },
        {
          name: "AFK channel",
          value: `${message.guild.afkChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "AFK timeout",
          value: `${time} minutes`,
          inline: true,
        },
        {
          name: "Server features",
          value: `${message.guild.features}`,
          inline: true,
        },
        {
          name: "Server Boost level",
          value: `${message.guild.premiumTier}`,
          inline: true,
        },
        {
          name: "Total boosts",
          value: `${message.guild.premiumSubscriptionCount} Boosts`,
          inline: true,
        },
        {
          name: "Rules channel",
          value: `${message.guild.rulesChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "System channel",
          value: `${message.guild.systemChannel ?? "None"}`,
          inline: true,
        },
        {
          name: "Verification level",
          value: `${message.guild.verificationLevel}`,
          inline: true,
        },
        {
          name: "Partnered server",
          value: partnered[message.guild.partnered],
          inline: true,
        },
        {
          name: "Verified server",
          value: verified[message.guild.verified],
          inline: true,
        }
      )
      .setThumbnail(message.guild.iconURL())
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};
