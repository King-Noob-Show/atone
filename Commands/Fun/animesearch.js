const { Command } = require("reconlx");
const {
  default: { request },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Command({
  name: "animesearch",
  description: "Search any anime",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/animesearch <query>",
  options: [
    {
      name: "query",
      description: "The query to search.",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const query = interaction.options.getString("query");

      if (!query)
        return interaction.followUp({
          content: "Please enter a query!",
        });

      const options = {
        url: `https://kitsu.io/api/edge/anime?filter[text]-${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
        },
        json: true,
      };

      const res = await request(options).catch((e) => {
        return interaction.followUp("No results found.");
      });

      if (!res) return interaction.followUp("No Results Found.");

      const anime = res.data.data[0];

      if (!anime) return interaction.followUp("No results found.");

      const animeSearch = {
        title: `${anime.attributes.titles.en_jp}`,
        url: `${anime.links.self}`,
        thumbnail: {
          url: anime.attributes.posterImage.original,
        },
        description: anime.attributes.synopsis,
        fields: [
          {
            name: "⏳ Status",
            value: anime.attributes.status,
            inline: true,
          },
          {
            name: "🗂 Type",
            value: anime.attributes.showType,
            inline: true,
          },
          {
            name: "🗓️ Aired",
            value:
              anime.attributes.startDate && anime.attributes.endDate
                ? anime.attributes.startDate == anime.attributes.endDate
                  ? `**${anime.attributes.startDate}**`
                  : `From **${
                      anime.attributes.startDate
                        ? anime.attributes.startDate
                        : "N/A"
                    }** to **${
                      anime.attributes.endDate
                        ? anime.attributes.endDate
                        : "N/A"
                    }**`
                : `From **${
                    anime.attributes.startDate
                      ? anime.attributes.startDate
                      : "N/A"
                  }** to **${
                    anime.attributes.endDate ? anime.attributes.endDate : "N/A"
                  }**`,
            inline: false,
          },
          {
            name: "💽 Total Episodes",
            value: `${
              anime.attributes.episodeCount
                ? anime.attributes.episodeCount
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "⏱ Duration",
            value: `${
              anime.attributes.episodeLength
                ? anime.attributes.episodeLength
                : "N/A"
            } Min`,
            inline: true,
          },
          {
            name: "⭐ Average Rating",
            value: `${
              anime.attributes.averageRating
                ? anime.attributes.averageRating
                : "N/A"
            }`,
            inline: true,
          },
          {
            name: "🏆 Rank",
            value: `${
              anime.attributes.ratingRank
                ? "**TOP " + anime.attributes.ratingRank + "**"
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
        embeds: [animeSearch],
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
