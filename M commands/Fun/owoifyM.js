const { Client, Message } = require("discord.js");
const neko = require("nekos.life");
const {
  sfw: { OwOify },
} = new neko();

module.exports = {
  name: "owo",
  description: "OwO",
  aliases: ["owoify"],
  category: "Fun",
  usage: ">>owo <text>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!args)
      return message.reply({
        content: "Please provide a valid input for the message to owoify.",
      });
    const input = args.join(" ");
    const { owo } = await OwOify({ text: input }).catch((e) =>
      console.log(e.message)
    );

    message.channel.send({ content: owo });
  },
};
