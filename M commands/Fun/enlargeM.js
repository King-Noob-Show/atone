const { Client, Message, MessageEmbed, Util } = require("discord.js");
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
        .setFooter({
          text: `Requested by ${interaction.member}`,
          iconURL: interaction.member.displayAvatarURL({
            format: "png",
            dynamic: true,
          }),
        })
        .setAuthor({
          name: `Enlarged ${parsedEmoji.name}`,
        })
        .setImage(url);
      return message.channel.send({ embeds: [embed] });
    } else {
      return message.reply({
        content: `Please supply a valid emoji!`,
      });
    }
  },
};
