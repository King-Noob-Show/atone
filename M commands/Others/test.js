const {
  Client,
  Message,
  MessageAttachment,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "test",
  description: "This is where I test commands I don't understand.",
  aliases: ["exam"],
  category: "Others",
  usage: ">>test <args>/[args]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    message.channel.send("There is no command to test right now.");
  },
};
