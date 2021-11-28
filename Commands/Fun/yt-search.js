const Scraper = require("@yimura/scraper").default;
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const youtube = new Scraper();
const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();
const ownerId = process.env.OWNER_ID;

module.exports = new Command({
  name: "youtube-search",
  description: "Search Videos On Youtube!",
  userPermissions: ["EMBED_LINKS" || "ATTACH_FILES"],
  category: "Fun",
  usage: "/yt-search <name>",
  options: [
    {
      name: "name",
      description: "The Search Query",
      required: true,
      type: "STRING",
    },
  ],
  run: async ({ client, interaction, args }) => {
    try {
      const next = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Next")
        .setCustomId("next");
      const row = new MessageActionRow().addComponents(next);
      const q = interaction.options.getString("name");
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
      interaction.followUp({
        embeds: [makeEmbed(index)],
        components: [row],
        ephemeral: false,
      });
      const filter = (i) =>
        i.customId === "next" && i.user.id === interaction.member.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
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
      if (interaction.member.user.id === ownerId) {
        interaction.followUp({
          content: "See Console For Error",
          ephemeral: true,
        });
        console.log(error);
      } else {
        return interaction.followUp({
          content: "No Videos Found!",
          ephemeral: true,
        });
      }
    }
  },
});
