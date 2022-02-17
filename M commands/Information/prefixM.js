const { Client, Message } = require("discord.js");
const prefixModel = require("../../models/prefixModel");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  name: "prefix",
  description: "Set or remove prefix!",
  aliases: ["pref"],
  category: "Information",
  usage: ">>prefix [set/remove] <prefix (if used set)>",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    if (args[0] === "set") {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        return message.reply(
          "Sorry! You don't have enough permissions to use this command!"
        );
      }
      if (!args[1]) {
        return message.reply("You have to provide a new prefix!");
      }
      if (args[1].length > 5) {
        return message.reply(
          "Sorry! prefix can only be less than or equal to 5 characters long"
        );
      }
      const data = await prefixModel.findOne({
        guildId: message.guildId,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          guildId: message.guildId,
        });

        let newData = new prefixModel({
          prefix: args[1],
          guildId: message.guildId,
        });
        newData.save();

        return message.channel.send(`New prefix is now \`${args[1]}\`.`);
      } else if (!data) {
        if (!message.member.permissions.has("ADMINISTRATOR"))
          return message.reply(
            "You don't have enough permissions to use this command!"
          );
        let newData = new prefixModel({
          prefix: args[1],
          guildId: message.guildId,
        });
        newData.save();

        return message.channel.send(`The new prefix is now \`${args[1]}\`.`);
      }
    } else if (args[0] === "remove") {
      const data = await prefixModel.findOne({
        guildId: message.guildId,
      });

      if (data) {
        await prefixModel.findOneAndRemove({
          guildId: message.guildId,
        });

        return message.channel.send(
          `Success! The old prefix was removed and replaced by the default one! \`>>\``
        );
      } else if (!data) {
        return message.channel.send(
          `Sorry! But you are already on the default prefix!`
        );
      }
    } else {
      const data = await prefixModel.findOne({
        guildId: message.guildId,
      });

      let prefix;

      if (data) {
        prefix = data.prefix;
      } else if (!data) {
        prefix = ">>";
      }
      return message.channel.send(`Current Prefix Is: ${prefix}`);
    }
  },
};
