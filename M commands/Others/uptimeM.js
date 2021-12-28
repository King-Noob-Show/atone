const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  description: "Uptime of the bot.",
  aliases: ["up"],
  category: "Others",
  usage: ">>uptime",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const uptime = moment
      .duration(client.uptime)
      .format(" D [days], H [hours], m [minutes], s [seconds]");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Uptime:")
      .setDescription(`\`\`\`${uptime}\`\`\``)
      .setTimestamp()
      .setFooter(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ format: "png", dynamic: true })
      );

    message.channel.send({ embeds: [embed] });
  },
};
