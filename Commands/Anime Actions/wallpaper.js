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
  usage: "/wallpaper",

  run: async ({ client, interaction, args }) => {
    const { url } = await wallpaper().catch((e) => console.log(e));
    const bllinks = [
      "https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png",
      "https://cdn.nekos.life/wallpaper/dvGFI8aD_og.jpg",
      "https://cdn.nekos.life/wallpaper/Bwt-fdzTGRU.jpg",
      "https://cdn.nekos.life/wallpaper/QWs7Um5XVnY.png",
      "https://cdn.nekos.life/wallpaper/pHGxn6DBgro.jpg",
      "https://cdn.nekos.life/wallpaper/hZD544TDT7Q.jpg",
      "https://cdn.nekos.life/wallpaper/4TmIwb3B-Wc.png",
      "https://cdn.nekos.life/wallpaper/c90VnhozkVo.jpg",
      "https://cdn.nekos.life/wallpaper/ZW6oAKcNZSU.jpg",
      "https://cdn.nekos.life/wallpaper/LCYoIPRBmGA.jpg",
      "https://cdn.nekos.life/wallpaper/SCIYqfdPw7c.jpg",
      "https://cdn.nekos.life/wallpaper/nWyEwEyiiBw.jpg",
      "https://cdn.nekos.life/wallpaper/FRk7KQkmtkw.jpg",
      "https://cdn.nekos.life/wallpaper/WCRYgKmrxqg.jpg",
      "https://cdn.nekos.life/wallpaper/IqeyVZyT69E.jpg",
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
