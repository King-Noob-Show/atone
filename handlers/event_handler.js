const chalk = require("chalk");
const { Client } = require("discord.js");
const fs = require("fs");

/**
 *
 * @param {Client} client
 */

module.exports = (client) => {
  try {
    console.log(chalk.cyan.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    fs.readdirSync("./events/").forEach((file) => {
      const events = fs
        .readdirSync("./events/")
        .filter((file) => file.endsWith(".js"));
      for (let file of events) {
        let pull = require(`../events/${file}`);
        if (pull.name) {
          client.events.set(pull.name, pull);
        }
      }
      console.log(chalk.cyan.bold(`${file} has been loaded.`));
    });
    console.log(chalk.cyan.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  } catch (e) {
    console.log(e.message);
  }
};
