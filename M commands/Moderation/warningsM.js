const { Client, Message, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");
const moment = require("moment");

module.exports = {
  name: "warnings",
  description: "Displays the number of warnings a user has.",
  aliases: ["warns", "acts"],
  category: "Moderation",
  usage: ">>warnings <user>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply(
          "You don't have enough permissions to use this command."
        );
      const user = message.mentions.members.first();
      if (!user) return message.reply("Please provide a valid user!");

      const userWarnings = await warnModel.find({
        userId: user.id,
        guildId: message.guildId,
      });
      if (!userWarnings?.length)
        return message.reply({
          content: `${user} has no warnings in the server`,
        });
      const embedDescription = userWarnings
        .map((warn) => {
          const moderator = message.guild.members.cache.get(warn.moderatorId);

          return [
            `WarnId: ${warn._id}`,
            `Moderator: ${moderator || "Has Left"}`,
            `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
            `Reason: ${warn.reason}`,
          ].join("\n");
        })
        .join("\n\n");

      const embed = new MessageEmbed()
        .setTitle(`${user.displayName}`)
        .setDescription(`**${embedDescription}**`)
        .setColor("AQUA");

      message.channel.send({ embeds: [embed] });
    } catch {
      message.reply(
        "Sorry! An error occured! Make sure you have provided valid info! If the error pursues, please contact us at King Noob Show#6679!"
      );
    }
  },
};
