const { Client, Message, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");
const moment = require("moment");

module.exports = {
  name: "warn",
  description: "Warn someone!",
  aliases: ["w"],
  category: "Moderation",
  usage: ">>warn <user> [reason]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply(
          "You do not have enough permissions to use this command!"
        );
      if (!args) return message.reply("Please provide valid info!");

      const user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      const reason = args.slice(1).join(" ") || "No reason provided.";
      if (!user) return message.reply("Please provide a valid user!");

      const userembed = new MessageEmbed()
        .setTitle(
          `**You have been warned in ${message.guild.name} for ${reason}**`
        )
        .setDescription(
          `**Moderator: ${
            message.member.displayName
          }\nReason: ${reason}\nTime: ${moment(Date.now()).format(
            "MMMM Do YYYY"
          )}**`
        )
        .setColor("AQUA");

      const warningembed = new MessageEmbed()
        .setTitle(
          `***${user.displayName} has been warned for ${reason} by ${message.member.displayName}***`
        )
        .setColor("AQUA");

      new warnModel({
        userId: user.id,
        guildId: message.guildId,
        moderatorId: message.member.id,
        reason,
        timestamp: Date.now(),
      }).save();

      await user.send({ embeds: [userembed] }).catch(() => {
        message.channel.send(
          `${user} have their DMs off so I could not send them a message.`
        );
      });

      await message.channel.send({ embeds: [warningembed] });
    } catch {
      message.reply(
        "Sorry! An error occured! Make sure you have provided valid info! If the error pursues, please contact us at King Noob Show#6679!"
      );
    }
  },
};
