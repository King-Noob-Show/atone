const { Client, Message, MessageEmbed } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const giphy = require("giphy-api")(process.env.GIPHY);
const ee = require("../../settings/embed.json");

module.exports = {
  name: "gif",
  description: "Search a gif.",
  aliases: ["giphy", "searchgif"],
  category: "Image",
  usage: ">>gif <query>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (!args[0]) {
      const embed2 = new MessageEmbed()
        .setColor(ee.embed_color)
        .setDescription("**Please Enter A Search Query!**")
        .setFooter({ text: ee.embed_footertext, iconURL: ee.embed_footericon });
      return message.reply({ embeds: [embed2], allowedMentions: false });
    }
    try {
      const search = args.join(" ");
      giphy.search(search).then(function (res) {
        const id = res.data[0].id;
        const url = `https://media.giphy.com/media/${id}/giphy.gif`;
        const embed = {
          color: ee.embed_color,
          timestamp: new Date(),
          footer: {
            text: message.guild.name,
            icon_url: message.guild.iconURL(),
          },
          image: {
            url: url,
          },
        };
        return message.channel.send({ embeds: [embed] });
      });
    } catch (e) {
      if (message.author.id === process.env.OWNER_ID) {
        return message.reply({ content: e.message });
      } else {
        message.channel.send(" **Not Found** ");
      }
    }
  },
};
