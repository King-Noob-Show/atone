const chalk = require("chalk");
const client = require("..");

client.on("ready", () => {
  console.log(chalk.blue.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(chalk.blue.bold(`${client.user.username} Is Now Online`));
  console.log(chalk.blue.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  client.user.setActivity(`Your Soul`, { type: "WATCHING" });
});
