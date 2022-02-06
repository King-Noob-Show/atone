const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json");

module.exports = {
  // options
  name: "help",
  description: `Show Bot All Commands`,
  aliases: ["h"],
  category: "Information",
  usage: ">>help",

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  // command start
  run: async (client, message, args) => {
    try {
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd = client.mcommands.get(args[0].toLowerCase());
        if (!cmd) {
          return message.reply({
            embeds: [
              embed
                .setColor(ee.embed_wrongcolor)
                .setDescription(
                  `No Information found for command **${args[0].toLowerCase()}**`
                ),
            ],
          });
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name)
          embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description)
          embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases}\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`${cmd.usage}\``);
          embed.setFooter({ text: "Syntax: <> = required, [] = optional" });
        }
        return message.channel.send({
          embeds: [embed.setColor(ee.embed_color)],
        });
      } else {
        let homeEmbed = new MessageEmbed()
          .setColor(ee.embed_color)
          .setTitle(`My All Message Commands`)
          .addField("Developer", `Name :- <@809246018679603201>`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter({
            text: ee.embed_footertext,
            iconURL: ee.embed_footericon,
          });

        const commands = (category) => {
          return client.mcommands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.mcategories.length; i += 1) {
            const current = client.mcategories[i];
            const items = commands(current);
            homeEmbed.addField(
              `**${current.toUpperCase()} [${items.length}]**`,
              `> ${items.join(", ")}`
            );
          }
        } catch (e) {
          console.log(e);
        }
        message.channel.send({ embeds: [homeEmbed] });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
