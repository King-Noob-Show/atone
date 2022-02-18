const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");
const moment = require("moment");

module.exports = new Command({
  name: "warnings",
  description: "Displays every warning a user has.",
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Moderation",
  usage: "/warnings <user>",
  options: [
    {
      name: "user",
      description: "The user to see warnings of.",
      type: "USER",
      required: false,
    },
    {
      name: "userid",
      description: "Id of the user to see the warnings of!",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const user =
        interaction.options.getMember("user") ||
        interaction.guild.members.cache.get(
          interaction.options.getString("userid")
        );
      if (!user) return interaction.followUp("Please provide a valid user!");

      const userWarnings = await warnModel.find({
        userId: user.id,
        guildId: interaction.guildId,
      });
      if (!userWarnings?.length)
        return interaction.followUp({
          content: `${user} has no warnings in the server`,
        });
      const embedDescription = userWarnings
        .map((warn) => {
          const moderator = interaction.guild.members.cache.get(
            warn.moderatorId
          );

          return [
            `WarnId: ${warn._id}`,
            `Moderator: ${moderator || "Has Left"}`,
            `Date: ${moment(warn.timestamp).format("MMMM Do YYYY")}`,
            `Reason: ${warn.reason}`,
          ].join("\n");
        })
        .join("\n\n");

      const embed = new MessageEmbed()
        .setTitle(`${user.displayName}`)
        .setDescription(`**${embedDescription}**`)
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
