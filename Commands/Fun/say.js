const { Command } = require("reconlx");

module.exports = new Command({
  name: "say",
  description: "Says whatever you say!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/say <input>",
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

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({
      content: `${interaction.user.username} says ${input}`,
    });
  },
});
