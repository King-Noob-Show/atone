const { Client } = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */

module.exports = async (client) => {
  const commandFiles = await globPromise(`${process.cwd()}/M commands/**/*.js`);

  commandFiles.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (file.name) {
      const properties = { directory, ...file };
      client.mcommands.set(file.name, properties);
    }
  });
};
