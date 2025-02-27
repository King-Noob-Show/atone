const { Command } = require("reconlx");
const nekos = require("nekos.life");
const {
  sfw: { OwOify },
} = new nekos();

module.exports = new Command({
  name: "owoify",
  description: "OwOify a message!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/owoify <message>",
  options: [
    {
      name: "message",
      description: "The message to owoify!",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const text = interaction.options.getString("message");
    const { owo } = await OwOify({ text: text }).catch((e) => console.log(e));

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ content: owo });
  },
});
