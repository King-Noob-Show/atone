const { Command } = require("reconlx");

module.exports = new Command({
  name: "kick",
  description: "Kick a person(or maybe a bot)!",
  category: "Moderation",
  userPermissions: ["KICK_MEMBERS"],
  options: [
    {
      name: "user",
      description: "The user to kick!",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "The reason to kick!",
      type: "STRING",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const target = interaction.options.getMember("user");
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
    target.kick(reason);
    interaction.followUp(
      `${target.user.tag} has been kicked from ${interaction.guild.name} for ${reason}!`
    );
  },
});
