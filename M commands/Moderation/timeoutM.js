const { Client, Message, MessageFlags } = require("discord.js");
const ms = require("ms");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "mute",
  description: "Mute a member.",
  aliases: ["timeout", "m"],
  category: "Moderation",
  usage: ">>mute <user> <time> -r <raeson>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply(
        "You dont have enough permissions to use this command."
      );

    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return message.reply("No user found.");
    }
    if (user.id === process.env.OWNER_ID)
      return message.reply("Why you trying to mute my owner!");

    if (user.id === message.member.id)
      return message.reply({
        content: "Very Funny! But you cannot mute yourself! :/",
      });

    if (user.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content: `You cannot mute ${user} because their roles are either equal or higher than yours!`,
      });

    const time = args[1];
    const member = message.guild.members.cache.get(user.id);
    const reason = args.slice(2).join(" ") || "No reason Provided";

    const timeinMS = ms(time);
    if (!timeinMS) return message.reply("Please enter a valid time!");
    if (!member) return message.reply("Please enter a valid user!");

    member.timeout(timeinMS, reason).catch(() => {
      return message.reply(
        `I cannot mute ${target} as they are above or equal to my role or they have admin perms.`
      );
    });
    message.channel.send(
      `${user} has been timed out by ${message.author} for ${time}!`
    );
  },
};
