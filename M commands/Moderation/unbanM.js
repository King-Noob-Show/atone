const { Client, Message } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a user",
  aliases: ["ub"],
  category: "Moderation",
  usage: ">>unban <user id>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const target = args[0];

    if (!target) return message.reply("Please provide a valid user's id!");

    message.guild.members
      .unban(target)
      .then((target) => {
        message.channel.send(
          `${target.username} has been unbanned from ${message.guild.name}`
        );
      })
      .catch(() => {
        message.reply("Please provide a valid banned user's id!");
      });
  },
};
