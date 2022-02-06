const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  description: "Tells you the info of a specific user!",
  aliases: ["whois"],
  category: "Information",
  usage: ">>userinfo [user]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const { guild } = message;
    const user = message.mentions.members.first() || message.author;
    const member = await message.guild.members.fetch(user);
    const owner = await guild.fetchOwner();
    const avpng = member.user.displayAvatarURL({
      format: "png",
      dynamic: true,
    });
    const joinedServerAt = `📅 ${moment(member.joinedTimestamp).format(
      "DD/MM/YYYY"
    )}`;
    const isBot = member.user.bot ? "✔️" : "❌";
    let memberPermissons = `${member.permissions
      .toArray()
      .map((p) => `${p}`)
      .join(", ")}`;
    if (member.user.id === owner.id) {
      memberPermissons = "SERVER_OWNER";
    }
    const joinedDiscordAt = `📅 ${moment(member.user.createdTimestamp).format(
      "DD/MM/YYYY"
    )}`;
    const flags = {
      DISCORD_EMPLOYEE: "Discord Employee",
      DISCORD_PARTNER: "Discord Partner",
      BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
      BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
      HYPESQUAD_EVENTS: "HypeSquad Events",
      HOUSE_BRAVERY: "House of Bravery",
      HOUSE_BRILLIANCE: "House of Brilliance",
      HOUSE_BALANCE: "House of Balance",
      EARLY_SUPPORTER: "Early Supporter",
      TEAM_USER: "Team User",
      SYSTEM: "System",
      VERIFIED_BOT: "Verified Bot",
      VERIFIED_DEVELOPER: "Verified Bot Developer",
    };
    const userFlags = member.user.flags.toArray();
    const badges = userFlags.length
      ? userFlags.map((flag) => flags[flag]).join(", ")
      : "None";
    const statuses = {
      online: "🟢",
      idle: "🌙",
      dnd: "⛔",
      offline: "⚫️",
    };
    const status = `${statuses[member.presence?.status]} ${
      member.presence?.status
    }`;
    const activity = member.presence?.activities[0];
    var userstatus = "None";
    if (activity) {
      if (activity.type === "CUSTOM_STATUS") {
        let emoji = `${
          activity.emoji
            ? activity.emoji.id
              ? `<${activity.emoji.animated ? "a" : ""}:${
                  activity.emoji.name
                }:${activity.emoji.id}>`
              : activity.emoji.name
            : ""
        }`;
        userstatus = `${emoji} ${activity.state || "None"}`;
      } else {
        userstatus = `${
          activity.type.toLowerCase().charAt(0).toUpperCase() +
          activity.type.toLowerCase().slice(1)
        } ${activity.name}`;
      }
    }
    const totalRoles = member.roles.cache.size;
    const roles = member.roles;
    const highestRole =
      member.roles.highest.id === guild.id ? "None" : member.roles.highest;
    function trimArray(arr, maxLen = 25) {
      if (Array.from(arr.values()).length > maxLen) {
        const len = Array.from(arr.values()).length - maxLen;
        arr = Array.from(arr.values())
          .sort((a, b) => b.rawPosition - a.rawPosition)
          .slice(0, maxLen);
        arr.map((role) => `<@&${role.id}>`);
        arr.push(`${len} more...`);
      }
      return arr.join(", ");
    }
    const Roles =
      member.roles.cache.size < 25
        ? Array.from(roles.cache.values())
            .sort((a, b) => b.rawPosition - a.rawPosition)
            .map((role) => `<@&${role.id}>`)
            .join(", ")
        : roles.cache.size > 25
        ? trimArray(roles.cache)
        : "None";

    const UserInfoEm = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor({
        name: member.user.tag,
        iconURL: member.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: `Avatar -`, value: `[PNG](${avpng})`, inline: true },
        {
          name: `Joined Server At -`,
          value: `${joinedServerAt}`,
          inline: true,
        },
        { name: `Bot -`, value: `${isBot}`, inline: true },
        { name: `Badges -`, value: `${badges}`, inline: true },
        { name: `Status -`, value: `${status}`, inline: true },
        { name: `Activity -`, value: `${userstatus}`, inline: true },
        { name: `Permissions -`, value: `${memberPermissons}`, inline: true },
        { name: `Highest Role -`, value: `${highestRole}`, inline: true },
        {
          name: `Role(s) :-`,
          value: `[${totalRoles}] -\n ${Roles}`,
          inline: true,
        }
      )
      .setFooter({
        text: `ID - ${member.user.id} | Joined Discord At - ${joinedDiscordAt}`,
      });
    await message.channel.send({
      content: `📄 Information about **${member.user.tag}**`,
      embeds: [UserInfoEm],
    });
  },
};
