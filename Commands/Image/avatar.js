const { Command } = require("reconlx");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({
  name: "avatar",
  description: "Provides Avatar of the provided user or slash command user",
  userPermissions: ["SEND_MESSAGES"],
  category: "Image",
  usage: "/avatar [user]",
  options: [
    {
      name: "user",
      description: "The User To Get The Avatar Of!",
      type: "USER",
      required: false,
    },
    {
      name: "userid",
      description: "The id of the user to get the avatar of!",
      type: "STRING",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    const user =
      interaction.options.getUser("user") ||
      interaction.options.getString("userid") ||
      interaction.member.id;

    if (user === interaction.options.getUser("user")) {
      return getAvatar(user.id);
    } else if (user === interaction.options.getString("userid")) {
      if (isNaN(user) === true) {
        return interaction.channel.send(
          "ID must be a number!" + " " + interaction.member.displayName
        );
      } else {
        return getAvatar(user);
      }
    } else {
      return getAvatar(user);
    }

    function getAvatar(id) {
      client.users
        .fetch(id)
        .then(async (user) => {
          return sendEmbed(user);
        })
        .catch(() => {
          return sendEmbed(interaction.member);
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
      return interaction.channel.send({
        embeds: [embed],
        components: [row],
      });
    }
  },
});
