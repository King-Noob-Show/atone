const { Command } = require("reconlx");

module.exports = new Command({
  name: "no-u",
  description: "No u",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/no-u [user]",
  options: [
    {
      name: "mention",
      description: "No U <Mention Here>",
      type: "USER",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const user = interaction.options.getMember("mention");
    if (!user) {
      return interaction.followUp({ content: "No U", ephemeral: false });
    }

    await interaction.followUp({ content: `No U ${user}`, ephemeral: false });
  },
});
