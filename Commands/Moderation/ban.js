const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Command({
  name: "ban",
  description: "Ban a person",
  userPermissions: ["BAN_MEMBERS"],
  category: "Moderation",
  usage: "/ban <user> [reason]",
  options: [
    {
      type: "USER",
      name: "user",
      description: "The user to ban!",
      required: false,
    },
    {
      name: "userid",
      description: "Id of the user to ban!",
      type: "STRING",
      required: false,
    },
    {
      type: "STRING",
      name: "reason",
      description: "The reason to ban!",
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

    if (target.id === process.env.OWNER_ID)
      return interaction.followUp("Why you trying to ban my owner!");

    if (target.id === interaction.member.id)
      return interaction.followUp({
        content: "Very Funny! But you cannot ban yourself! :/",
      });

    if (
      target.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.followUp({
        content: `You cannot ban ${target} because their roles are either equal or higher than yours!`,
        ephemeral: true,
      });
    if (!target.bannable || target.user.id === client.user.id)
      return interaction.followUp({
        content: `I am sorry but i cannot ban ${target}!`,
        ephemeral: true,
      });

    await target.send(
      `You have been banned from ${interaction.guild.name} for ${reason}`
    );
    await target.ban({ reason }).catch(() => {
      return interaction.followUp(
        `I cannot ban ${target} as they are above or equal to my role or they have admin perms.`
      );
    });

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send(
      `${target.user.tag} has been banned from ${interaction.guild.name} for ${reason}!`
    );
  },
});
