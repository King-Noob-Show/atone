const rrModel = require("../../Models/reactionRoles");
const { Command } = require("reconlx");

module.exports = new Command({
  name: "add-role",
  description: "Add a custom reaction role!",
  userPermissions: ["MANAGE_ROLES"],
  options: [
    {
      name: "role",
      description: "The role to add",
      type: "ROLE",
      required: true,
    },
    {
      name: "description",
      description: "Description of the role",
      type: "STRING",
      required: true,
    },
    {
      name: "emoji",
      description: "Emoji to be used beside the role",
      type: "STRING",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const role = interaction.options.getRole("role");
    const roleDescription =
      interaction.options.getString("description") || null;
    const roleEmoji = interaction.options.getString("emoji") || null;

    if (role.position >= interaction.guild.me.roles.highest.position)
      return interaction.followUp({
        content: "I can't assign a role that is equal or higher than me!",
        ephemeral: true,
      });

    const guildData = await rrModel.findOne({ guildId: interaction.guildId });

    const newRole = {
      roleId: role.id,
      roleDescription,
      roleEmoji,
    };

    if (guildData) {
      const roleData = guildData.roles.find((x) => x.roleId === role.id);

      if (roleData) {
        roleData = newRole;
      } else {
        guildData.roles = [...guildData.roles, newRole];
      }

      await guildData.save();
    } else {
      await rrModel.create({
        guildId: interaction.guildId,
        roles: newRole,
      });
    }

    interaction.followUp({
      content: `Created a new role: ${role.id} `,
      ephemeral: false,
    });
  },
});
