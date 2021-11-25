const { Command } = require("reconlx");

module.exports = new Command({
  name: "say",
  description: "Says whatever you say!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  options: [
    {
      name: "input",
      description: "The input to say",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ client, interaction, args }) => {
    const input = interaction.options.getString("input");

    await interaction.followUp({
      content: `${interaction.user.username} says ${input}`,
      ephemeral: false,
    });
  },
});
