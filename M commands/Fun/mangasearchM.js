const { Client, Message } = require("discord.js");
const {
  default: { request },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "mangasearch",
  description: "Search any manga!",
  aliases: ["manga", "ms"],
  category: "Fun",
  usage: ">>mangasearch <query>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    try {
      const query = args.join(" ");

      if (!query) return message.reply("Please enter a valid query!");

      const option = {
        url: `https://kitsu.io/api/edge/manga?filter[text]-${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        json: true,
      };

      const res = await request(option).catch(() => {
        return message.reply({
          content: "No results were found!",
        });
      });

      if (!res)
        return message.reply({
          content: "No results were found!",
        });

      const manga = res.data.data[0];
      if (!manga)
        return message.reply({
          content: "No results were found!",
        });

      const mangaSearch = {
        title: `${manga.attributes.titles.en_jp}`,
        url: `${manga.links.self}`,
        thumbnail: {
          url: manga.attributes.posterImage.original,
        },
        description: manga.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: manga.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: manga.type,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
              manga.attributes.startDate && manga.attributes.endDate
                ? manga.attributes.startDate == manga.attributes.endDate
                  ? `**${manga.attributes.startDate}**`
                  : `From **${
                      manga.attributes.startDate
                        ? manga.attributes.startDate
                        : "N/A"
                    }** to **${
                      manga.attributes.endDate
                        ? manga.attributes.endDate
                        : "N/A"
                    }**`
                : `From **${
                    manga.attributes.startDate
                      ? manga.attributes.startDate
                      : "N/A"
                  }** to **${
                    manga.attributes.endDate ? manga.attributes.endDate : "N/A"
                  }**`,
            inline: false,
          },
          {
            name: "📰 Chapters",
            value: `${
              manga.attributes.chapterCount
                ? manga.attributes.chapterCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "📚 Volumes",
            value: `${
              manga.attributes.volumeCount
                ? manga.attributes.volumeCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
              manga.attributes.averageRating
                ? manga.attributes.averageRating
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
              manga.attributes.ratingRank
                ? "**TOP " + manga.attributes.ratingRank + "**"
                : "N/A"
            }`,
            inline: true,
          },
        ],
        color: "AQUA",
      };

      return message.channel.send({
        embeds: [mangaSearch],
      });
    } catch (e) {
      message.member.id === process.env.OWNER_ID
        ? console.log(e)
        : message.reply(
            "Sorry an error occured, please try again after some time. If the problem persists, contact us at King Noob Show#6679"
          );
    }
  },
};
