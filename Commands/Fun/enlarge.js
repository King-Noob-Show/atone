const { MessageEmbed, Util } = require("discord.js");
const { parse } = require("twemoji-parser");
const { Command } = require("reconlx");
const ee = require("../../settings/embed.json");
module.exports = new Command({
  name: "enlarge",
  description: "Enlarge an emoji",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/enlarge <emoji>",
  options: [
    {
      name: "emoji",
      description: "The emoji to enlarge!",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const emoji =
      interaction.options.getString("emoji") || "No emoji was provided";

    const parsedEmoji = Util.parseEmoji(emoji);

    if (parsedEmoji) {
      const ex = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + ex}`;
      const embed = new MessageEmbed()
        .setColor("AQUA")
        .setFooter({ text: ee.embed_footertext, iconURL: ee.embed_footericon })
        .setAuthor({
          name: `Enlarged ${parsedEmoji.name}`,
          iconURL: client.user.displayAvatarURL(),
        })
        .setImage(url);
      return interaction.followUp({ embeds: [embed], ephemeral: false });
    } else {
      return interaction.followUp({
        content: `Please supply a valid emoji!`,
        ephemeral: true,
      });
    }
  },
});
