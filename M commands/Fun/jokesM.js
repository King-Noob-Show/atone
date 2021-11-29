const { Client, Message, MessageEmbed } = require("discord.js");
const Memer = require("random-jokes-api");

module.exports = {
  name: "joke",
  description: "Tells a random joke!",
  aliases: ["j"],
  category: "Fun",
  usage: ">>joke",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const joke = Memer.joke();
    const embed = new MessageEmbed()
      .setTitle("Random Joke")
      .setColor("AQUA")
      .setDescription(joke)
      .setTimestamp();

    await message.channel.send({ embeds: [embed] });
  },
};
