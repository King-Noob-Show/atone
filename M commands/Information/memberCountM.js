const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "membercount",
  description: "Tells the member count of the current server!",
  aliases: ["members"],
  category: "Information",
  usage: ">>membercount",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const members = message.guild.memberCount;

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setAuthor({
        name: message.guild.name,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTitle(`**Member Count of ${message.guild.name}**`)
      .setDescription(`**${members}**`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
