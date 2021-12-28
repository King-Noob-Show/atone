const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const neko = require("nekos.life");
const {
  sfw: { baka },
} = new neko();

module.exports = {
  name: "baka",
  description: "That user is a baka!",
  aliases: ["idiot"],
  category: "Anime Actions",
  usage: ">>baka <user>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    const { url } = await baka().catch((e) => console.log(e.message));
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();

    if (!user)
      return message.reply({
        content: "Please provide a valid user!",
        allowedMentions: false,
      });

    if (!url)
      return message.reply({
        content:
          "Sorry, But this command cannot be used right now! Please contact the owner of the bot.",
      });

    if (user.id === client.user.id)
      return message.reply({
        content: "You dare call me a baka! You peasant!!",
      });

    message.channel.send({ content: `${user} Baka!`, embeds: [embed] });
  },
};
