const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");

module.exports = new Command({
  name: "removewarn",
  description: "Remove someone's warn",
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Moderation",
  usage: "/removewarn <warnid>",
  options: [
    {
      name: "warnid",
      description:
        "The id of the warn (use >>warnings <user> or /warnings <user> to get warn id)",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const warnId = interaction.options.getString("warnid");

      if (!warnId)
        return interaction.followUp("Please provide a valid warn id!");

      const data = await warnModel.findById(warnId).catch(() => {});

      if (!data)
        return interaction.followUp({
          content: `${warnId} is not a valid id!`,
        });

      data.delete();

      const user = interaction.guild.members.cache.get(data.userId);

      const embed = new MessageEmbed()
        .setTitle(`***Removed ${user.displayName}'s warn with id ${warnId}***`)
        .setColor("AQUA");

      await interaction.followUp("Loading...");
      await interaction.deleteReply();
      await interaction.channel.send({ embeds: [embed] });
    } catch {
      interaction.followUp(
        "Sorry! An error occured! Make sure you have provided valid info! If the error pursues, please contact us at King Noob Show#6679!"
      );
    }
  },
});
