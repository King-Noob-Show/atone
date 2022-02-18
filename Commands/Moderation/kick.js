const { Command } = require("reconlx");

module.exports = new Command({
  name: "kick",
  description: "Kick a person(or maybe a bot)!",
  category: "Moderation",
  userPermissions: ["KICK_MEMBERS"],
  usage: "/kick <user> [reason]",
  options: [
    {
      name: "user",
      description: "The user to kick!",
      type: "USER",
      required: false,
    },
    {
      name: "userid",
      description: "Id of the user to kick!",
      type: "STRING",
      required: false,
    },
    {
      name: "reason",
      description: "The reason to kick!",
      type: "STRING",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const target =
      interaction.options.getMember("user") ||
      interaction.guild.members.cache.get(
        interaction.options.getString("userid")
      );

    if (!target) {
      return interaction.followUp("Please provide a valid user!");
    }
    const reason =
      interaction.options.getString("reason") || "No reason Provided";

    if (
      !target.roles.highest.position >=
      interaction.member.roles.highest.position
    )
      return interaction.followUp({
        content: `You cannot kick ${target.nickname} because their roles are either equal or higher than yours!`,
        ephemeral: true,
      });
    if (!target.kickable || target.user.id === client.user.id)
      return interaction.followUp({
        content: `I am sorry but i cannot kick ${target.nickname}!`,
        ephemeral: true,
      });

    await target.send(
      `You have been kicked from ${interaction.guild.name} for ${reason}`
    );
    await target.kick(reason).catch(() => {
      return interaction.followUp(
        `I cannot kick ${target} as they are above or equal to my role or they have admin perms.`
      );
    });

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send(
      `${target.user.tag} has been kicked from ${interaction.guild.name} for ${reason}!`
    );
  },
});
