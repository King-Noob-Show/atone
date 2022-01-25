const { MessageEmbed, Message, Client } = require("discord.js");
const {
  default: { get },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = {
  name: "catfact",
  description: "A random catfact!",
  aliases: ["ctft"],
  category: "Fun",
  usage: ">>catfact",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const fact = await get(`${base}fun/catfact${token}`);
    const embed = new MessageEmbed()
      .setTitle("Random Catfact!")
      .setDescription(`**${fact.data.fact}**`)
      .setTimestamp()
      .setColor("AQUA");

    message.channel.send({ embeds: [embed] });
  },
};
