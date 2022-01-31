const { Command } = require("reconlx");
const { MessageEmbed } = require("discord.js");
const warnModel = require("../../models/warnModel");
const moment = require("moment");

module.exports = new Command({
  name: "warn",
  description: "Warn someone!",
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Moderation",
  usage: "/warn <user> [reason]",
  options: [
    {
      name: "user",
      description: "The user to warn!",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Reason to warn!",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      const user = interaction.options.getMember("user");
      const reason =
        interaction.options.getString("reason") || "No reason provided.";
      if (!user) return interaction.followUp("Please provide a valid user!");

      const userembed = new MessageEmbed()
        .setTitle(
          `**You have been warned in ${interaction.guild.name} for ${reason}**`
        )
        .setDescription(
          `**Moderator: ${
            interaction.member.displayName
          }\nReason: ${reason}\nTime: ${moment(Date.now()).format(
            "MMMM Do YYYY"
          )}**`
        )
        .setColor("AQUA");

      const warningembed = new MessageEmbed()
        .setTitle(
          `***${user.displayName} has been warned for ${reason} by ${interaction.member.displayName}***`
        )
        .setColor("AQUA");

      new warnModel({
        userId: user.id,
        guildId: interaction.guildId,
        moderatorId: interaction.member.id,
        reason,
        timestamp: Date.now(),
      }).save();

      await interaction.followUp("Loading...");
      await interaction.deleteReply();

      await user.send({ embeds: [userembed] }).catch(() => {
        interaction.channel.send(
          `${user} have their DMs off so I could not send them a message.`
        );
      });

      await interaction.channel.send({ embeds: [warningembed] });
    } catch {
      interaction.followUp(
        "Sorry! An error occured! Make sure you have provided valid info! If the error pursues, please contact us at King Noob Show#6679!"
      );
    }
  },
});
