const { Command } = require("reconlx");

module.exports = new Command({
  name: "unban",
  description: "Unban a person(or maybe a bot)!",
  category: "Moderation",
  userPermissions: ["KICK_MEMBERS"],
  usage: "/unban <user id>",
  options: [
    {
      name: "userid",
      description: "The user to unban! (Please provide id)",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const target = interaction.options.getString("userid");

    interaction.guild.members.unban(target).then((user) => {
      interaction
        .followUp({
          content: `${user.tag} has been unbanned from ${interaction.guild.name}`,
          ephemeral: false,
        })
        .catch(() => {
          interaction.followUp("Please specify a valid banned user's id!");
        });
    });
  },
});
