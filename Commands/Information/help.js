const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const ee = require("../../settings/embed.json");

module.exports = new Command({
  // options
  name: "help",
  description: `Show Bot All Commands`,
  userPermissions: ["SEND_MESSAGES"],
  category: "Information",
  usage: "/help [command]",
  options: [
    {
      name: "command",
      description: "The command you need help with!",
      type: "STRING",
      required: false,
    },
  ],
  // command start
  run: async ({ client, interaction, args }) => {
    const command = interaction.options.getString("command");
    try {
      if (command) {
        const embed = new MessageEmbed();
        const cmd = client.Commands.get(command.toLowerCase());
        if (!cmd) {
          return interaction.followUp({
            embeds: [
              embed
                .setColor(ee.embed_wrongcolor)
                .setDescription(
                  `No Information found for command **${command.toLowerCase()}**`
                ),
            ],
          });
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name)
          embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description)
          embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.usage) {
          embed.addField("**Usage**", `\`${cmd.usage}\``);
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        return interaction.followUp({
          embeds: [embed.setColor(ee.embed_color)],
        });
      } else {
        let homeEmbed = new MessageEmbed()
          .setColor(ee.embed_color)
          .setTitle(` 🔰 My All Slash Commands`)
          .addField("Developer", `Name :- <@809246018679603201>`)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .setFooter(ee.embed_footertext, ee.embed_footericon);

        const commands = (category) => {
          return client.Commands.filter((cmd) => cmd.category === category).map(
            (cmd) => `\`${cmd.name}\``
          );
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            homeEmbed.addField(
              `**${current.toUpperCase()} [${items.length}]**`,
              `> ${items.join(", ")}`
            );
          }
        } catch (e) {
          console.log(e);
        }
        interaction.followUp({ embeds: [homeEmbed], ephemeral: false });
      }
    } catch (e) {
      console.log(e);
    }
  },
});
