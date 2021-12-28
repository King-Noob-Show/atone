const { Command } = require("reconlx");
const { duration } = require("moment");
const { MessageEmbed } = require("discord.js");
const {} = require("moment-duration-format");

module.exports = new Command({
  name: "uptime",
  description: "Check the bot's uptime!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Others",
  usage: "/uptime",

  run: async ({ client, interaction, args }) => {
    const uptime = duration(client.uptime).format(
      " D [days], H [hours], m [minutes], s [seconds]"
    );

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Uptime:")
      .setDescription(`\`\`\`${uptime}\`\`\``)
      .setTimestamp()
      .setFooter(
        `${interaction.member.user.tag}`,
        interaction.member.displayAvatarURL({ format: "png", dynamic: true })
      );

    interaction.followUp({ embeds: [embed] });
  },
});
