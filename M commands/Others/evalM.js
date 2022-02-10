const { Client, Message } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "eval",
  description: "Evaluate any javascript code! (Only for the owner.)",
  aliases: ["ev"],
  category: "Others",
  usage: ">>eval <script>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (message.member.id !== process.env.OWNER_ID)
      return message.reply("Sorry this command can only be use by the owner!");

    const code = args.join(" ");

    const result = new Promise((resolve) => resolve(eval(code)));

    return result
      .then((output) => {
        if (typeof output !== "string") {
          output = require("util").inspect(output, { depth: 0 });
        }
        if (output.includes(client.token)) {
          output = output.replace(message.client.token, "T0K3N");
        }
        message.channel.send(output, {
          code: "js",
        });
      })
      .catch((err) => {
        err = err.toString();
        if (err.includes(message.client.token)) {
          err = err.replace(message.client.token, "T0K3N");
        }
        message.channel.send(err, {
          code: "js",
        });
      });
  },
};
