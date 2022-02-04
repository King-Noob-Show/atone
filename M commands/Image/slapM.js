const { Client, Message, MessageEmbed } = require("discord.js");
const nekos = require("nekos.life");
const {
  sfw: { slap },
} = new nekos();

module.exports = {
  name: "slap",
  description: "Slap someone!",
  aliases: ["sl"],
  category: "Image",
  usage: ">>slap <user>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    const { url } = await slap().catch((e) => console.log(e));
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();
    if (!user)
      return message.reply({
        content: "Please provide a valid user!",
        allowedMentions: true,
      });
    if (!url)
      return message.reply({
        content:
          "Sorry but this command cannot be used right now! Please contact the Owner!",
      });
    if (user.id === client.user.id)
      return message.reply({
        content: "You cannot slap me! You peasant!!",
      });
    if (message.member.user.id === user.id)
      return message.reply({
        content: "You cannot slap yourself :/",
      });

    message.channel.send({
      content: `${user} was slapped by ${message.member.user}!`,
      embeds: [embed],
    });
  },
};
