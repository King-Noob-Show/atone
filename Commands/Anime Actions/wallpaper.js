const { Command } = require("reconlx");
const nekos = require("nekos.life");
const { MessageEmbed } = require("discord.js");
const {
  sfw: { wallpaper },
} = new nekos();

module.exports = new Command({
  name: "wallpaper",
  description: "Random anime wallpaper!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Anime Actions",

  run: async ({ client, interaction, args }) => {
    const { url } = await wallpaper().catch((e) => console.log(e));
    const bllinks = [
      "https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png",
      "https://cdn.nekos.life/wallpaper/dvGFI8aD_og.jpg",
      "https://cdn.nekos.life/wallpaper/Bwt-fdzTGRU.jpg",
      "https://cdn.nekos.life/wallpaper/QWs7Um5XVnY.png",
      "https://cdn.nekos.life/wallpaper/pHGxn6DBgro.jpg",
    ];
    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setImage(url)
      .setTimestamp();

    if (
      url === bllinks[0] ||
      url === bllinks[1] ||
      url === bllinks[2] ||
      url === bllinks[3] ||
      url === bllinks[4]
    )
      return interaction.followUp({
        content: "An error occured! Please rerun the command!",
        ephemeral: true,
      });
    if (!url)
      return interaction.followUp({
        content:
          "Sorry, But this command cannot be used right now! Please contact the owner of the bot.",
        ephemeral: true,
      });

    interaction.followUp({
      content:
        "Here you go!\nWARNING: This may return a NSFW wallpaper due to a glitch! If that happens, please contact us at King Noob Show#6679!",
      embeds: [embed],
    });
  },
});
