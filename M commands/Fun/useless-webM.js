const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "useless-web",
  description: "Takes you to a random useless website!",
  aliases: ["useless"],
  category: "Fun",
  usage: ">>useless-web",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const useless = Memer.uselessweb();
    const embed = new MessageEmbed()
      .setTitle("Here you go!")
      .setColor("AQUA")
      .setDescription(useless)
      .setTimestamp();

    const button = new MessageActionRow().addComponents([
      new MessageButton().setStyle("LINK").setLabel("URL").setURL(useless),
    ]);

    message.channel.send({ embeds: [embed], components: [button] });
  },
};
