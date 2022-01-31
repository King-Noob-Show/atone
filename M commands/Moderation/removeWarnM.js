const { Client, Message, MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = {
  name: "removewarn",
  description: "Remove any user's warnings",
  aliases: ["clearwarn", "clearwarns", "delwarn"],
  category: "Moderation",
  usage: ">>removewarn <warn id>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.reply(
          "You don't have enough permissions to use this command!"
        );

      const warnId = args[0];
      if (!warnId) return message.reply("Please provide a valid warn id!");

      const data = await warnModel.findById(warnId).catch(() => {});

      if (!data)
        return message.reply({ content: `${warnId} is not a valid id!` });

      data.delete();

      const user = message.guild.members.cache.get(data.userId);

      const embed = new MessageEmbed()
        .setTitle(`***Removed ${user.displayName}'s warn with id ${warnId}***`)
        .setColor("AQUA");

      message.channel.send({ embeds: [embed] });
    } catch {
      message.reply(
        "Sorry! An error occured! Make sure you have provided valid info! If the error pursues, please contact us at King Noob Show#6679!"
      );
    }
  },
};
