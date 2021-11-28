const { MessageEmbed } = require("discord.js");
const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();
const ee = require("../../settings/embed.json");

module.exports = new Command({
  name: "credits",
  description: "Credits to everything and everyone who helped make the bot!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Others",
  usage: "/credits",

  run: async ({ client, interaction, args }) => {
    const embed = new MessageEmbed()
      .setAuthor("Atone", client.user.displayAvatarURL({ dynamic: true }))
      .setColor("AQUA")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/809246018679603201/886ddf7431f84193aa0dc8f3098aec56.png?size=4096&ignore=true"
      )
      .setTitle("Credits")
      .setDescription(
        "Here are all the credits to everyone who suppoerted this bot!"
      )
      .addField(
        "Developer",
        `King Noob Show#6679 or <@${process.env.OWNER_ID}>`
      )
      .addField(
        "Major Thanks to :-",
        "[Reconlx](https://www.youtube.com/channel/UCC-5dJ0BPTRSMaoDxntduHg) for the reconlx api and many tutorials.\n[discord.js](https://discord.js.org/) for providing the most important api here."
      )
      .addField(
        "And thanks to ther other api used :-",
        "@discordjs/builders\n@discordjs/rest\n@yimura/scraper\ndiscord-api-types\ndotenv\nglob\nmoment\nmongoose\nnekos.life\nnode-fetch\nrandom-jokes-api\ntwemoji-parser"
      )
      .setFooter(ee.embed_footertext, ee.embed_footericon)
      .setTimestamp();

    interaction.followUp({ embeds: [embed] });
  },
});
