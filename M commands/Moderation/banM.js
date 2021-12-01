const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "ban",
  description: "Ban someone!",
  aliases: ["b"],
  category: "Moderation",
  usage: ">>ban <user> [reason]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const target = message.mentions.members.first();
    const reason = args[1] || "No reason Provided!";

    if (!message.member.permissions.has("BAN_MEMBERS"))
      return message.reply(
        "Sorry but you need the BAN_MEMBERS permission to run this command"
      );
    if (target.id === process.env.OWNER_ID)
      return message.reply("Why you trying to ban my owner!");

    if (target.id === message.member.id)
      return message.reply({
        content: "Very Funny! But you cannot ban yourself! :/",
      });

    if (target.roles.highest.position >= message.member.roles.highest.position)
      return message.reply({
        content: `You cannot ban ${target} because their roles are either equal or higher than yours!`,
      });
    if (!target.bannable || target.user.id === client.user.id)
      return message.reply({
        content: `I am sorry but i cannot ban ${target}!`,
      });

    await target
      .send(`You have been banned from ${message.guild.name} for ${reason}`)
      .catch((e) => {
        if (e.message.toLowerCase() === "cannot send messages to this user")
          return message.reply("Cannot send messages to this user but.....");
      });
    target.ban({ reason: reason });
    message.channel.send(
      `${target.user.tag} has been banned from ${message.guild.name} for ${reason}!`
    );
  },
};
