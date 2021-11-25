const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const ee = require("../../settings/embed.json");

module.exports = new Command({
  name: "information",
  description: "Get information about a user or a server.",
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  options: [
    {
      name: "server",
      description: "Tells all of the information about the server!",
      type: "SUB_COMMAND",
    },
    {
      name: "member",
      description: "Tells all of the information about a member!",
      type: "SUB_COMMAND",
      options: [
        {
          name: "member",
          description: "The member to tell the information about!",
          type: "USER",
          required: false,
        },
      ],
    },
  ],

  run: async ({ client, interaction, args }) => {
    const { options, guild } = interaction;
    const SUB_COMMAND = options.getSubcommand();
    const user = options.getUser("member") || interaction.user;
    const member = await interaction.guild.members.fetch(user);
    const owner = await guild.fetchOwner();

    if (SUB_COMMAND === "server") {
      //Channels
      const categories = guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_CATEGORY"
      ).size;
      const textChannels = guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_TEXT"
      ).size;
      const voiceChannels = guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_VOICE"
      ).size;
      const newsChannels = guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_NEWS"
      );
      const stageChannels = guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_STAGE_VOICE"
      );
      //Members
      const totalMembers = guild.memberCount;
      const humanMembers = guild.members.cache.filter((m) => !m.user.bot).size;
      const botMembers = guild.members.cache.filter((m) => m.user.bot).size;
      //Roles
      const totalRoles = guild.roles.cache.size;
      //Boosts
      const boostLevel = guild.premiumTier ? guild.premiumTier : "0";
      const totalBoosts = guild.premiumSubscriptionCount || "0";
      //Emojis
      const totalEmojis = guild.emojis.cache.size;
      const normalEmojis = guild.emojis.cache.filter((e) => !e.animated).size;
      const animatedEmojis = guild.emojis.cache.filter((e) => e.animated).size;
      //Created At
      const createdAt = `📅 ${moment(guild.createdTimestamp).format(
        "LT"
      )} ${moment(guild.createdTimestamp).format("LL")} ${moment(
        guild.createdTimestamp
      ).fromNow()}`;

      const ServerInfoEm = new MessageEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage(guild.bannerURL())
        .addFields(
          { name: `Owner -`, value: `${owner.user.tag}`, inline: true },
          { name: `Owner Id -`, value: `${owner.user.id}`, inline: true },
          { name: `Categories -`, value: `${categories}`, inline: true },
          { name: `Text Channels -`, value: `${textChannels}`, inline: true },
          { name: `Voice Channels -`, value: `${voiceChannels}`, inline: true },
          { name: `News Channels -`, value: `${newsChannels}`, inline: true },
          { name: `Stage Channels -`, value: `${stageChannels}`, inline: true },
          { name: `Total Members -`, value: `${totalMembers}`, inline: true },
          { name: `Human Members -`, value: `${humanMembers}`, inline: true },
          { name: `Bot Members -`, value: `${botMembers}`, inline: true },
          { name: `Total Roles -`, value: `${totalRoles}`, inline: true },
          { name: `Boost Level -`, value: `${boostLevel}`, inline: true },
          { name: `Total Boosts -`, value: `${totalBoosts}`, inline: true },
          {
            name: `Emojis -`,
            value: `Total : ${totalEmojis}, Normal : ${normalEmojis}, Animated : ${animatedEmojis}`,
            inline: true,
          }
        )
        .setFooter(`ID - ${guild.id} | Created At - ${createdAt}`);

      await interaction.followUp({
        content: `🖥 Information about **${guild.name}**`,
        embeds: [ServerInfoEm],
      });
    } else if (SUB_COMMAND === "member") {
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
        .map((p) => `\`${p}\``)
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
          userstatus = `${emoji} \`${activity.state || "None"}\``;
        } else {
          userstatus = `\`${
            activity.type.toLowerCase().charAt(0).toUpperCase() +
            activity.type.toLowerCase().slice(1)
          } ${activity.name}\``;
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
        .setAuthor(
          member.user.tag,
          member.user.displayAvatarURL({ dynamic: true })
        )
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
        .setFooter(
          `ID - ${member.user.id} | Joined Discord At - ${joinedDiscordAt}`
        );
      await interaction.followUp({
        content: `📄 Information about **${member.user.tag}**`,
        embeds: [UserInfoEm],
      });
    }
  },
});
