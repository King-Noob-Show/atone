const { Command } = require("reconlx");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const {
  sfw: { slap },
} = new nekos();

module.exports = new Command({
  name: "slap",
  description: "Slap a user",
  userPermissions: ["ATTACH_FILES"],
  category: "Image",
  usage: "/slap <user>",
  options: [
    {
      name: "user",
      description: "The user to slap",
      type: "USER",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getMember("user");
    const { url } = await slap().catch((e) => console.log(e));
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();

    if (!url)
      return interaction.followUp({
        content:
          "Sorry but this command cannot be used right now! Please contact the Owner!",
        ephemeral: true,
      });
    if (user.id === client.user.id)
      return interaction.followUp({
        content: "You cannot slap me! You peasant!!",
        ephemeral: false,
      });
    if (interaction.user.id === user.id)
      return interaction.followUp({
        content: "You cannot slap yourself :/",
        ephemeral: false,
      });

    interaction.followUp({
      content: `${user} was slapped by ${interaction.member}!`,
      embeds: [embed],
    });
  },
});
