const { Command } = require("reconlx");
const Memer = require("random-jokes-api");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({
  name: "would-you-rather",
  description: "Would You Rather?",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/would-you-rather",

  run: async ({ client, interaction, args }) => {
    const rather = Memer.wouldYouRather();

    const embed = new MessageEmbed()
      .setTitle("Would You Rather?")
      .setDescription(rather)
      .setColor("AQUA")
      .setTimestamp();

    const buttons = new MessageActionRow().addComponents([
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Option 1")
        .setCustomId("Option 1")
        .setEmoji("1️⃣"),

      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Option 2")
        .setCustomId("Option 2")
        .setEmoji("2️⃣"),
    ]);

    interaction.followUp({ embeds: [embed], components: [buttons] });

    const collector = interaction.channel.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id === interaction.user.id) {
        await i.update(`${i.user.username} has chosen ${i.customId}!!`);
      } else {
        await i.update({
          content: `This interaction is not for you ${i.user.username}`,
        });
      }
    });
  },
});
