const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();
const {
  default: { get },
} = require("axios");
const token = process.env.API2;
const base = process.env.ZBASE;
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "randomwaifu",
  description: "Generate a random waifu!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Image",
  usage: "/randomwaifu",

  run: async ({ client, interaction, args }) => {
    const waifu = await get(`${base}fun/randomwaifu${token}`);

    if (waifu.data.images[0].tags[0].is_nsfw === true)
      return interaction.followUp("An error occured, please try again!");

    let source = waifu.data.images[0].source;

    if (source === null || source === undefined) {
      source = "Not known";
    }

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setTitle("**Random Waifu**")
      .setDescription(`***Source: ${source}***`)
      .setImage(waifu.data.images[0].url)
      .setTimestamp();

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ embeds: [embed] });
  },
});
