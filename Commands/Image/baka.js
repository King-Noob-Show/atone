const { Command } = require("reconlx");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const {
  sfw: { baka },
} = new nekos();

module.exports = new Command({
  name: "baka",
  description: "@user is a baka!",
  userPermissions: ["ATTACH_FILES"],
  category: "Image",
  usage: "/baka <user>",
  options: [
    {
      name: "user",
      description: "The user that is a total BAKA!",
      type: "USER",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getMember("user");
    const { url } = await baka().catch((e) => {
      console.log(e);
    });
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();

    if (!url)
      return interaction.followUp({
        content:
          "Sorry, But this command cannot be used right now! Please contact the owner of the bot.",
        ephemeral: true,
      });

    if (user.id === client.user.id)
      return interaction.followUp({
        content: "You dare call me a baka! You peasant!!",
        ephemeral: false,
      });

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({
      content: `${user} Baka!`,
      embeds: [embed],
    });
  },
});
