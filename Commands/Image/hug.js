const { Command } = require("reconlx");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const {
  sfw: { hug },
} = new nekos();

module.exports = new Command({
  name: "hug",
  description: "Hug someone!",
  userPermissions: ["ATTACH_FILES"],
  category: "Image",
  usage: "/hug [user]",
  options: [
    {
      name: "user",
      description: "The user to hug!",
      type: "USER",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getMember("user");
    const { url } = await hug().catch((e) => console.log(e));
    const embed = new MessageEmbed().setColor(url).setImage(url).setTimestamp();

    if (user.id === interaction.user.id)
      return interaction.followUp({
        content: "Awww! You want a hug? Here you go, a hug from me!",
        embeds: [embed],
      });
    if (user.id === client.user.id)
      return interaction.followUp({
        content: "Oh, You're hugging me? How cute! Thankyou!!!",
      });
    if (!url)
      return interaction.followUp({
        content:
          "Sorry but this command cannot be used right now! Please contact the Owner!",
        ephemeral: true,
      });

    interaction.followUp({
      content: `${interaction.user} hugged ${user}`,
      embeds: [embed],
    });
  },
});
