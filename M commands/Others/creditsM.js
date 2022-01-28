const { Client, Message, MessageEmbed } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const {
  embed_color,
  embed_footericon,
  embed_footertext,
} = require("../../settings/embed.json");
const color = embed_color;
const icon = embed_footericon;
const text = embed_footertext;
const owner = process.env.OWNER_ID;

module.exports = {
  name: "credits",
  description: "Credits to everyone who supported this project.",
  aliases: ["crdt"],
  category: "Others",
  usage: ">>credits",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("**Credits || Atoner**")
      .setDescription(
        "**Credits to everyone who helped support this project!**"
      )
      .addFields(
        {
          name: "**Developer**",
          value: `**King Noob Show#6679 or <@${owner}>**`,
        },
        {
          name: "**Guides And Other Helpers**",
          value: `**[Discord.js Guide](https://discordjs.guide/)\n[An Idiot's Guide](https://anidiots.guide/)\n[Stack Overflow](https://stackoverflow.com/)\n[Discord.js Discord Server](https://discord.gg/djs)\n[Reconlx](https://www.youtube.com/channel/UCC-5dJ0BPTRSMaoDxntduHg)\n[Reconlx Discord Server](https://discord.gg/JxSfVUCa2V)**`,
        },
        {
          name: "**Dependencies and Packages that**",
          value: `**[Discord.js](https://discord.js.org)\n[@discordjs/builders](https://discordjs.guide/popular-topics/builders.html)\n[@discordjs/rest](https://www.npmjs.com/package/@discordjs/rest)\n[@discordjs/voice](https://discordjs.guide/voice/#installation)\n[@iamtraction/google-translate](https://github.com/iamtraction/google-translate)\n[@yimura/scraper](https://github.com/Yimura/Scraper)\n[Amethyste-api](https://api.amethyste.moe/)\n[Axios](https://axios-http.com/)\n[Canvas](https://github.com/Automattic/node-canvas)\n[Discord-api-types](https://github.com/discordjs/discord-api-types)**`,
          inline: true,
        },
        {
          name: "**helped**",
          value: `**[Dotenv](https://github.com/motdotla/dotenv#readme)\n[Giphy-api](https://github.com/austinkelleher/giphy-api)\n[Glob](https://github.com/isaacs/node-glob#readme)\n[Moment-duration-format](https://github.com/jsmreese/moment-duration-format)\n[Moment](https://momentjs.com)\n[Mongoose](https://mongoosejs.com)\n[Nekos.life](https://github.com/Nekos-life/nekos-dot-life#readme)\n[Reconlx (Dependency)](https://reconlx.github.io/reconlx-api/)\n[Twemoji-parser](https://github.com/twitter/twemoji-parser/)**`,
          inline: true,
        },
        {
          name: "**APIs that were used**",
          value: `**[Amethyste API](https://api.amethyste.moe/)\n[Zero Two API](https://notzerotwo.ml/)**`,
        }
      )
      .setColor(color)
      .setFooter({
        text: text,
        iconURL: icon,
      });

    await message.channel.send({ embeds: [embed] });
  },
};
