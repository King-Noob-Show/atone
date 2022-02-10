const {
  Client,
  Message,
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
    if (!args[0]) return getAvatar(message.author.id);

    if (
      args[0].startsWith("<@") &&
      args[0].endsWith(">") &&
      args[0].length == 21 &&
      !isNaN(args[0].slice(2, 20))
    )
      return getAvatar(args[0].slice(2, 20));
    if (
      args[0].startsWith("<@!") &&
      args[0].endsWith(">") &&
      args[0].length == 22 &&
      !isNaN(args[0].slice(3, 21))
    )
      return getAvatar(args[0].slice(3, 21));
    if (!isNaN(args[0]) && args[0].length == 18) return getAvatar(args[0]);
    return getAvatar(message.author.id);

    function getAvatar(id) {
      client.users
        .fetch(id)
        .then(async (user) => {
          return sendEmbed(user);
        })
        .catch(() => {
          return sendEmbed(message.author);
        });
    }
    function sendEmbed(target) {
      const png = target.displayAvatarURL({ format: "png" });
      const jpg = target.displayAvatarURL({ format: "jpg" });
      const webp = target.displayAvatarURL({ format: "webp" });
      const gif = target.displayAvatarURL({ format: "gif", dynamic: true });
      const embed = {
        title: "Avatar",
        description: `Avatar of ${target.username}`,
        image: {
          url: target.displayAvatarURL({ dynamic: true, size: 512 }),
        },
        color: "AQUA",
      };
      const row = new MessageActionRow().addComponents([
        new MessageButton().setURL(png).setLabel("PNG").setStyle("LINK"),
        new MessageButton().setURL(jpg).setLabel("JPG").setStyle("LINK"),
        new MessageButton().setURL(webp).setLabel("WEBP").setStyle("LINK"),
        new MessageButton().setURL(gif).setLabel("GIF").setStyle("LINK"),
      ]);
      return message.channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  },
};
