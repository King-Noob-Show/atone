const { MessageEmbed, Util, Message } = require("discord.js");
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
    const emoji = interaction.options.getString("emoji");

    if (!emoji) {
      return interaction.followUp("Please supply a valid emoji!");
    }

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

      await interaction.followUp("Loading...");
      await interaction.deleteReply();
      await interaction.channel.send({ embeds: [embed] });
    } else {
      return interaction.followUp({
        content: `Please supply a valid emoji!`,
        ephemeral: true,
      });
    }
  },
});
