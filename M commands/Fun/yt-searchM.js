const {
  Client,
  Message,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} = require("discord.js");
const Scraper = require("@yimura/scraper").default;
const youtube = new Scraper();
const dotenv = require("dotenv");
dotenv.config();
const ownerId = process.env.OWNER_ID;

module.exports = {
  name: "youtube-search",
  description: "Search something on youtube!",
  aliases: ["yt", "youtube"],
  category: "Fun",
  usage: ">>youtube-search <query>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      const next = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Next")
        .setCustomId("next");
      const row = new MessageActionRow().addComponents(next);
      const q = args.join(" ");
      const array = await youtube.search(q);
      let index = 0;
      const makeEmbed = (ind) => {
        return new MessageEmbed()
          .setURL(array.videos[ind].link)
          .setTitle(array.videos[ind].title)
          .setDescription(
            `Views: ${array.videos[ind].views} | Uploaded ${array.videos[ind].uploaded}`
          )
          .setColor("AQUA")
          .setImage(array.videos[ind].thumbnail);
      };
      message.channel.send({
        embeds: [makeEmbed(index)],
        components: [row],
      });
      const filter = (i) =>
        i.customId === "next" && i.user.id === message.member.user.id;

      const collector = message.channel.createMessageComponentCollector({
        filter,
        time: 50000,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "next") {
          index++;
          if (index === array.videos.length)
            return i.update({
              content: "You've Reached The End!",
              embeds: [],
              components: [],
            });
          await i.update({
            content: `${index}/${array.videos.length}`,
            embeds: [makeEmbed(index)],
            components: [row],
          });
        }
      });
    } catch (error) {
      if (message.member.user.id === ownerId) {
        message.reply({
          content: "See Console For Error",
          allowedMentions: false,
        });
        console.log(error);
      } else {
        return message.reply({
          content: "No Videos Found!",
        });
      }
    }
  },
};
