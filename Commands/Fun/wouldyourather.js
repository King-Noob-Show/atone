const { Command } = require("reconlx");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const {
  default: { request },
} = require("axios");
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = new Command({
  name: "would-you-rather",
  description: "Would You Rather?",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/would-you-rather",

  run: async ({ client, interaction, args }) => {
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

      await interaction.followUp({ embeds: [embed], components: [buttons] });

      const filter = (i) => i.user.id === interaction.member.id;

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: "BUTTON",
        filter: filter,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "op1") {
          button1.setDisabled(true);
          button2.setDisabled(true);
          await i.update({
            content: `**<@${interaction.member.id}> has chosen to ${op1}**`,
            components: [row2],
          });
        } else if (i.customId === "op2") {
          button1.setDisabled(true);
          button2.setDisabled(true);
          await i.update({
            content: `**<@${interaction.member.id}> has chosen to ${op2}**`,
            components: [row2],
          });
        }
      });
    } catch (e) {
      if (interaction.member.id === process.env.OWNER_ID) {
        interaction.followUp("Check da console.");
        console.log(e);
      } else {
        interaction.followUp("An error occurred! Please try later!");
      }
    }
  },
});
