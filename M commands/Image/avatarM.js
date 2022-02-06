const {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Download or see a user's avatar",
  aliases: ["av"],
  category: "Image",
  usage: ">>avatar [user]",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    if (!user) return message.reply("Please provide a valid user");

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(`\`Click the button below to download!\``)
      .setFooter({
        text: "Request by " + message.member.user.tag,
        iconURL: message.member.displayAvatarURL(),
      })
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    const row = new MessageActionRow().addComponents([
      new MessageButton()
        .setURL(
          user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })
        )
        .setLabel("PNG")
        .setStyle("LINK"),
      new MessageButton()
        .setURL(
          user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg" })
        )
        .setLabel("JPG")
        .setStyle("LINK"),
      new MessageButton()
        .setURL(
          user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp" })
        )
        .setLabel("WEBP")
        .setStyle("LINK"),
      new MessageButton()
        .setURL(
          user.displayAvatarURL({ size: 2048, dynamic: true, format: "gif" })
        )
        .setLabel("GIF")
        .setStyle("LINK"),
    ]);

    message.channel.send({ embeds: [embed], components: [row] });
  },
};
