const { Command } = require("reconlx");
const ms = require("ms");

module.exports = new Command({
  name: "mute",
  description: "Mute a user",
  userPermissions: ["MANAGE_MESSAGES" || "KICK_MEMBERS"],
  category: "Moderation",
  usage: "/mute <user> <time> [reason]",
  options: [
    {
      name: "user",
      description: "The user to mute",
      type: "USER",
      required: true,
    },
    {
      name: "time",
      description: "The time to mute the user for.",
      type: "STRING",
      required: true,
    },
    {
      name: "reason",
      description: "The reason to mute the user.",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getUser("user");
    const time = interaction.options.getString("time");
    const reason =
      interaction.options.getString("reason") || "No reason provided.";
    const member = interaction.guild.members.cache.get(user.id);

    const timeinMS = ms(time);
    if (!timeinMS) return interaction.followUp("Please enter a valid time!");

    await member.timeout(timeinMS, reason);

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send(
      `${user} has been timed out for ${time}. (${reason})`
    );
  },
});
