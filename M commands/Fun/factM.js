const { Client, Message, MessageEmbed } = require("discord.js");
const {
  default: { get },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = {
  name: "fact",
  description: "FACT!",
  aliases: ["fct"],
  category: "Fun",
  usage: ">>fact",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const res = await get(`${base}fun/fact${token}`);
    const embed = new MessageEmbed()
      .setTitle("FACT!")
      .setDescription(`**${res.data.fact}**`)
      .setColor("AQUA")
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
