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
    try {
      const options = {
        url: `${base}fun/wouldyourather${token}`,
        method: "GET",
      };

      const res = await request(options);

      const op1 = res.data.option_1;
      const op2 = res.data.option_2;

      const embed = new MessageEmbed()
        .setTitle("**Would You Rather?**")
        .setDescription(`**${op1}\nOR\n${op2}**`)
        .setColor("AQUA");

      const button1 = new MessageButton()
        .setLabel(`${op1}`)
        .setStyle("SUCCESS")
        .setCustomId("op1")
        .setEmoji("1️⃣");

      const button2 = new MessageButton()
        .setLabel(`${op2}`)
        .setStyle("SUCCESS")
        .setCustomId("op2")
        .setEmoji("2️⃣");

      const button1dis = new MessageButton()
        .setLabel(`${op1}`)
        .setStyle("SECONDARY")
        .setCustomId("op1")
        .setEmoji("1️⃣")
        .setDisabled(true);

      const button2dis = new MessageButton()
        .setLabel(`${op2}`)
        .setStyle("SECONDARY")
        .setCustomId("op2")
        .setEmoji("2️⃣")
        .setDisabled(true);

      const buttons = new MessageActionRow().addComponents([button1, button2]);

      const row2 = new MessageActionRow().addComponents([
        button1dis,
        button2dis,
      ]);

      await message.reply({
        embeds: [embed],
        components: [buttons],
      });

      const filter = (i) => i.user.id === message.member.id;

      const collector = message.channel.createMessageComponentCollector({
        componentType: "BUTTON",
        filter: filter,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "op1") {
          button1.setDisabled(true);
          button2.setDisabled(true);
          await i.update({
            content: `**<@${message.member.id}> has chosen to ${op1}**`,
            components: [row2],
          });
        } else if (i.customId === "op2") {
          button1.setDisabled(true);
          button2.setDisabled(true);
          await i.update({
            content: `**<@${message.member.id}> has chosen to ${op2}**`,
            components: [row2],
          });
        }
      });
    } catch (e) {
      if (message.member.id === process.env.OWNER_ID) {
        message.reply("Check da console.");
        console.log(e);
      } else {
        message.reply("An error occurred! Please try later!");
      }
    }
  },
};
