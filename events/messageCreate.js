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

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "no u")
    return message.reply({ content: "no u", allowedMentions: false });
});

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    message.guild ||
    message.author.id !== process.env.OWNER_ID
  )
    return;

  const m = message.content;
  const guild = client.guilds.cache.get("895896922483732500");
  const channel = guild.channels.cache.get("895898024226742292");

  channel.send(`${m}`);
});
