const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json");

module.exports = {
  name: "credits",
  description: "Credits to everyone who helped!",
  aliases: ["credit"],
  category: "Others",
  usage: ">>credits",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
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
        "[Reconlx](https://www.youtube.com/channel/UCC-5dJ0BPTRSMaoDxntduHg) for the reconlx api and many tutorials.\n[discord.js](https://discord.js.org/) for providing the most important api here.\n[discordjs guide](https://discordjs.guide/) for helping me learn discord.js."
      )
      .addField(
        "And thanks to ther other api used :-",
        "@discordjs/builders\n@discordjs/rest\n@yimura/scraper\ndiscord-api-types\ndotenv\nglob\nmoment\nmongoose\nnekos.life\nnode-fetch\nrandom-jokes-api\ntwemoji-parser\ncanvas"
      )
      .setFooter(ee.embed_footertext, ee.embed_footericon)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
