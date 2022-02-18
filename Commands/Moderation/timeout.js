const { Command } = require("reconlx");
const ms = require("ms");

module.exports = new Command({
  name: "mute",
  description: "Mute a user",
  userPermissions: ["MANAGE_MESSAGES"],
  category: "Moderation",
  usage: "/mute <user> <time> [reason]",
  options: [
    {
      name: "user",
      description: "The user to mute",
      type: "USER",
      required: false,
    },
    {
      name: "userid",
      description: "Id of the user to mute!",
      type: "STRING",
      required: false,
    },
    {
      name: "time",
      description: "The time to mute the user for.",
      type: "STRING",
      required: false,
    },
    {
      name: "reason",
      description: "The reason to mute the user.",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const user =
      interaction.options.getUser("user") ||
      interaction.guild.members.cache.get(
        interaction.options.getString("userid")
      );

    if (!user) {
      return interaction.followUp("Please provide a valid user!");
    }

    if (user.id === process.env.OWNER_ID)
      return interaction.followUp("Why you trying to mute my owner!");

    if (user.id === interaction.member.id)
      return interaction.followUp({
        content: "Very Funny! But you cannot mute yourself! :/",
      });

    if (
      user.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.followUp({
        content: `You cannot mute ${user} because their roles are either equal or higher than yours!`,
      });

    const time = interaction.options.getString("time");
    if (!time) {
      return interaction.followUp("Please provide a valid time!");
    }
    const reason =
      interaction.options.getString("reason") || "No reason provided.";
    const member = interaction.guild.members.cache.get(user.id);

    const timeinMS = ms(time);
    if (!timeinMS) return interaction.followUp("Please enter a valid time!");

    await member.timeout(timeinMS, reason).catch(() => {
      return interaction.followUp(
        `I cannot mute ${member} as they are above or equal to my role or they have admin perms.`
      );
    });

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send(
      `${user} has been timed out for ${time}. (${reason})`
    );
  },
});
