const client = require("..");
const dotenv = require("dotenv");
dotenv.config();
const prefix = process.env.prefix;

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const mcommand =
    client.mcommands.get(cmd.toLowerCase()) ||
    client.mcommands.find((c) => c.aliases?.includes(cmd.toLowerCase()));

  if (!mcommand) return;
  await mcommand.run(client, message, args);
});
