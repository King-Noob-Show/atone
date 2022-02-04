const { Command } = require("reconlx");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const {
  sfw: { avatar },
} = new nekos();

module.exports = new Command({
  name: "anime-avatar",
  description: "A random anime image to put as your avatar!",
  userPermissions: ["ATTACH_FILES"],
  category: "Image",
  usage: "/anime-avatar",

  run: async ({ client, interaction, args }) => {
    const { url } = await avatar().catch((e) => console.log(e.message));
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

    interaction.followUp({ content: "Here you go!", embeds: [embed] });
  },
});
