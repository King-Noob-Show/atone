const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Command({
  name: "eval",
  description: "Evaluate any javascript code.",
  userPermissions: ["ADMINISTRATOR"],
  category: "Other",
  usage: "/eval <code>",
  options: [
    {
      name: "code",
      description: "The code to evaluate!",
      type: "STRING",
      required: true,
    },
  ],

  run: async ({ client, interaction, args }) => {
    if (interaction.member.id !== process.env.OWNER_ID)
      return interaction.followUp(
        "Sorry this command can only be use by the owner!"
      );

    const code = interaction.options.getString("code");

    const result = new Promise((resolve) => resolve(eval(code)));

    return result
      .then((output) => {
        if (typeof output !== "string") {
          output = require("util").inspect(output, { depth: 0 });
        }
        if (output.includes(client.token)) {
          output = output.replace(interaction.client.token, "T0K3N");
        }
        interaction.followUp(output, {
          code: "js",
        });
      })
      .catch((err) => {
        err = err.toString();
        if (err.includes(interaction.client.token)) {
          err = err.replace(interaction.client.token, "T0K3N");
        }
        interaction.followUp(err, {
          code: "js",
        });
      });
  },
});
