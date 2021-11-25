const { Command } = require("reconlx");
const Memer = require("random-jokes-api");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({
  name: "useless-web",
  description: "Go to a random useless website!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",

  run: async ({ client, interaction, args }) => {
    const url = Memer.uselessweb();

    const embed = new MessageEmbed()
      .setTitle("Here's a random useless website!!")
      .setDescription(url)
      .setColor("AQUA")
      .setTimestamp();

    const buttons = new MessageActionRow().addComponents([
      new MessageButton().setStyle("LINK").setURL(url).setLabel("URL"),
    ]);

    interaction.followUp({ embeds: [embed], components: [buttons] });
  },
});
