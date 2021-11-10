const { Command } = require("reconlx");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = new Command({
  name: "avatar",
  description: "Provides Avatar of the provided user or slash command user",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  options: [
    {
      name: "user",
      description: "The User To Get The Avatar Of!",
      type: "USER",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    let user = interaction.options.getUser("user") || interaction.user;
    let embed = new MessageEmbed()
      .setColor("AQUA")
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(`\`Click the button below to download!\``)
      .setFooter(
        "Request by " + interaction.member.user.tag,
        interaction.member.displayAvatarURL()
      )
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

    interaction.followUp({
      embeds: [embed],
      components: [row],
      ephemeral: false,
    });
  },
});
