const rrModel = require("../../Models/reactionRoles");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "remove-role",
  description: "Remove a custom reaction role!",
  userPermissions: ["MANAGE_ROLES"],
  options: [
    {
      name: "role",
      description: "The role to remove",
      type: "ROLE",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const role = interaction.options.getRole("role");
    const guildData = rrModel.findOne({ guildId: interaction.guildId });

    if (!guildData)
      return interaction.followUp({
        content: "There are no roles inside this server",
        ephemeral: true,
      });

    const guildRoles = guildData.roles;
    const findRole = guildRoles.find((x) => x.roleId === role.id);

    if (!findRole)
      return interaction.followUp({
        content: "This role is not added to the Reaction Roles list",
        ephemeral: true,
      });

    const filteredRoles = guildRoles.filter((x) => x.roleId !== role.id);
    guildData.roles = filteredRoles;

    await guildData.save();

    interaction.followUp({
      content: `Removed: ${role.name}`,
      ephemeral: false,
    });
  },
});
