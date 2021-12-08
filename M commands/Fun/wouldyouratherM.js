const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "wouldyourather",
  description: "Would you rather?",
  aliases: ["wyr"],
  category: "Fun",
  usage: ">>wouldyourather",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
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

    message.channel.send({ embeds: [embed], components: [buttons] });

    const collector = message.channel.createMessageComponentCollector({
      componentType: "BUTTON",
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id === message.author.id) {
        await i.update(`${i.user.username} has chosen ${i.customId}!!`);
      } else {
        await i.update({
          content: `This interaction is not for you ${i.user.username}`,
        });
      }
    });
  },
};
