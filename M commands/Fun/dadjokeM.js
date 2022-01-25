const { Client, Message, MessageEmbed } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;
const {
  default: { get },
} = require("axios");

module.exports = {
  name: "dadjoke",
  description: "A very bad dad joke.",
  aliases: ["ddjk"],
  category: "Fun",
  usage: ">>dadjoke",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const res = await get(`${base}fun/dadjoke${token}`);
    const embed = new MessageEmbed()
      .setTitle("Dad Joke")
      .setDescription(`**${res.data.joke}**`)
      .setColor("AQUA")
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
