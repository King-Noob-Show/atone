const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();
const {
  default: { request },
} = require("axios");

module.exports = new Command({
  name: "mangasearch",
  description: "Search any manga!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/mangasearch <query>",
  options: [
    {
      name: "query",
      description: "The query to search!",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const query = interaction.options.getString("query");

      if (!query) return interaction.followUp("Please enter a valid query!");

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
        return interaction.followUp({
          content: "No results were found!",
        });
      });

      if (!res)
        return interaction.followUp({
          content: "No results were found!",
        });

      const manga = res.data.data[0];
      if (!manga)
        return interaction.followUp({
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

      await interaction.followUp("Loading...");
      await interaction.deleteReply();
      interaction.channel.send({
        embeds: [mangaSearch],
      });
    } catch (e) {
      interaction.member.id === process.env.OWNER_ID
        ? console.log(e)
        : interaction.followUp(
            "Sorry an error occured, please try again after some time. If the problem persists, contact us at King Noob Show#6679"
          );
    }
  },
});
