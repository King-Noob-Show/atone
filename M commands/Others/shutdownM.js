const { Message, Client } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "shutdown",
  description: "A command for the owner to shutdown the bot!",
  category: "Others",
  usage: ">>shutdown",
  aliases: ["shut"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.reply(
        "Sorry This Command can only be used by the owner of the bot."
      );
    if (message.member.id !== process.env.OWNER_ID)
      return message.reply(
        "Sorry This Command can only be used by the owner of the bot!"
      );

    await message.channel.send("Shutting Down Bot......");
    await message.channel.send("Bot has been shut down!");

    process.exit();
  },
};
