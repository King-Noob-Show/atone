const { Client, Message } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mute a member.",
  aliases: ["timeout", "m"],
  category: "Moderation",
  usage: ">>mute <user> <time>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (message.member.permissions.has("MANAGE_MESSAGES" || "KICK_MEMBERS"))
      return message.reply(
        "You dont have enough permissions to use this command."
      );

    const user = message.mentions.members.first();
    if (!user) {
      message.reply("No user found.");
    }
    const time = args[1];
    const member = message.guild.members.cache.get(user.id);
    const reason = args.slice(2).join(" ") || "No reason Provided";

    const timeinMS = ms(time);
    if (!timeinMS) return message.reply("Please enter a valid time!");
    if (!member) return message.reply("Please enter a valid user!");

    member.timeout(timeinMS, reason);
    message.channel.send(
      `${user} has been timed out by ${message.author} for ${time}!`
    );
  },
};
