const { Client, Message, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
const ee = require("../../settings/embed.json");

module.exports = {
  name: "enlarge",
  description: "Enlarge an emoji!",
  aliases: ["en"],
  category: "Fun",
  usage: ">>enlarge <emoji>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const emoji = args[0];
    if (!emoji) return "Please provide a valid emoji";
    const parsedEmoji = Util.parseEmoji(emoji);

    if (parsedEmoji) {
      const ex = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + ex}`;
      const embed = new MessageEmbed()
        .setColor("AQUA")
        .setFooter(ee.embed_footertext, ee.embed_footericon)
        .setAuthor(
          `Enlarged ${parsedEmoji.name}`,
          client.user.displayAvatarURL()
        )
        .setImage(url);
      return message.reply({ embeds: [embed] });
    } else {
      return message.reply({
        content: `Please supply a valid emoji!`,
      });
    }
  },
};
