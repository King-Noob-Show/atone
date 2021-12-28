const { Client, Message, MessageEmbed } = require("discord.js");
const neko = require("nekos.life");
const {
  sfw: { hug },
} = new neko();

module.exports = {
  name: "hug",
  description: "Hug someone!",
  aliases: ["huggy-wuggy"],
  category: "Anime Actions",
  usage: ">>hug <user>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    const { url } = await hug().catch((e) => console.log(e));
    const embed = new MessageEmbed().setColor(url).setImage(url).setTimestamp();

    if (!user)
      return message.reply({ content: "Please provide a valid user to hug." });

    if (user.id === message.member.user.id)
      return message.reply({
        content: "Awww! You want a hug? Here you go, a hug from me!",
        embeds: [embed],
        allowedMentions: false,
      });
    if (user.id === client.user.id)
      return message.reply({
        content: "Oh, You're hugging me? How cute! Thankyou!!!",
        embeds: [embed],
        allowedMentions: false,
      });
    if (!url)
      return message.reply({
        content:
          "Sorry but this command cannot be used right now! Please contact the Owner!",
        ephemeral: true,
      });

    message.channel.send({
      content: `${message.member.user} hugged ${user}`,
      embeds: [embed],
    });
  },
};
