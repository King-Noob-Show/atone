const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "kick",
  description: "Kick a member!",
  aliases: ["k"],
  category: "Moderation",
  usage: ">>kick <user> [reason]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const target = message.mentions.members.first();
    const reason = args[1] || "No reason was provided!";

    if (!target) return message.reply("Please provide a valid user!");

    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.reply(
        "Sorry but you need the KICK_MEMBERS permission to run this command!"
      );
    if (target.id === process.env.OWNER_ID)
      return message.reply("Why you trying to kick my owner!");

    if (target.id === message.member.id)
      return message.reply({
        content: "Very Funny! But you cannot kick yourself! :/",
      });

    if (target.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content: `You cannot kick ${target} because their roles are either equal or higher than yours!`,
      });
    if (!target.kickable || target.user.id === client.user.id)
      return message.reply({
        content: `I am sorry but i cannot kick ${target}!`,
      });

    await target
      .send(`You have been kicked from ${message.guild.name} for ${reason}`)
      .catch((e) => {
        if (e.message.toLowerCase() === "cannot send messages to this user")
          return message.reply("Cannot send messages to this user but.....");
      });
    target.kick(reason);
    message.channel.send(
      `${target.user.tag} has been kicked from ${message.guild.name} for ${reason}!`
    );
  },
};
