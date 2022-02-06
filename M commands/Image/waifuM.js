const { Client, Message, MessageEmbed } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const {
  default: { get },
} = require("axios");
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = {
  name: "randomwaifu",
  description: "Generate a random waifu!",
  aliases: ["waifugen", "waifu"],
  category: "Image",
  usage: ">>waifugenerator",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const waifu = await get(`${base}fun/randomwaifu${token}`);

    if (waifu.data.images[0].tags[0].is_nsfw === true)
      return message.reply("An error occured, please try again!");

    let source = waifu.data.images[0].source;

    if (source === null || source === undefined) {
      source = "Not known";
    }

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setTitle("**Random Waifu**")
      .setDescription(`***Source: ${source}***`)
      .setImage(waifu.data.images[0].url)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
