const { Command } = require("reconlx");
const translate = require("@iamtraction/google-translate");

module.exports = new Command({
  name: "translate",
  description: "Translate a query!",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/translate <language> <query>",
  options: [
    {
      name: "language",
      description: "The language to translate the text in.",
      type: "STRING",
      required: true,
    },
    {
      name: "query",
      description: "The query to translate.",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const lang = interaction.options.getString("language");
    const query = interaction.options.getString("query");

    const trans = await translate(query, { to: lang }).catch((e) => {
      interaction.followUp(e.message);
    });
    interaction.followUp(trans.text).catch(() => {});
  },
});
