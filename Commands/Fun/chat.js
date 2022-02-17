const { Command } = require("reconlx");
const {
  default: { request },
} = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.API2;
const base = process.env.ZBASE;

module.exports = new Command({
  name: "chat",
  description: "Chat with a chatbot!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/chat <message>",
  options: [
    {
      name: "message",
      description: "Message to chat with!",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const uuid = interaction.member.id;
    const msg = interaction.options.getString("message");

    const options = {
      method: "GET",
      url: `${base}fun/chatbot${token}&message=${msg}&uuid=${uuid}`,
    };

    const res = await request(options);

    const reply = res.data.reply;

    await interaction.followUp(".");
    await interaction.editReply("..");
    await interaction.editReply("...");
    await interaction.deleteReply();
    interaction.channel.send({ content: reply });
  },
});
