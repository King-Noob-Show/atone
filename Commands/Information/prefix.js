const { Command } = require("reconlx");
const prefixModel = require("../../models/prefixModel");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Command({
  name: "prefix",
  description: "Set or remove prefix!",
  userPermissions: ["ADMINISTRATOR"],
  category: "Information",
  usage: "/prefix [set/remove] <prefix (if used set)>",
  options: [
    {
      name: "set",
      description: "Set a prefix!",
      type: "SUB_COMMAND",
      options: [
        {
          name: "prefix",
          description: "The prefix to set!",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove the current prefix and use the default one!",
      type: "SUB_COMMAND",
      options: [
        {
          name: "remove",
          description: "Remove the current prefix?",
          type: "BOOLEAN",
          required: true,
        },
      ],
    },
    {
      name: "current",
      description: "See the current prefix.",
      type: "SUB_COMMAND",
    },
  ],

  run: async ({ client, interaction, args }) => {
    try {
      await interaction.followUp("Loading...");
      await interaction.deleteReply();
      if (interaction.options.getSubcommand() === "set") {
        if (interaction.options.getString("prefix").length > 5) {
          return interaction.followUp(
            "Sorry! prefix can only be less than or equal to 5 characters long"
          );
        }
        const data = await prefixModel.findOne({
          guildId: interaction.guildId,
        });

        if (data) {
          await prefixModel.findOneAndRemove({
            guildId: interaction.guildId,
          });

          let newData = new prefixModel({
            prefix: interaction.options.getString("prefix"),
            guildId: interaction.guildId,
          });
          newData.save();

          return interaction.channel.send(`New prefix is now \`${args[1]}\`.`);
        } else if (!data) {
          let newData = new prefixModel({
            prefix: interaction.options.getString("prefix"),
            guildId: interaction.guildId,
          });
          newData.save();

          return interaction.channel.send(
            `The new prefix is now \`${args[1]}\`.`
          );
        }
      } else if (interaction.options.getSubcommand() === "remove") {
        if (interaction.options.getBoolean("remove") === true) {
          const data = await prefixModel.findOne({
            guildId: interaction.guildId,
          });

          if (data) {
            await prefixModel.findOneAndRemove({
              guildId: interaction.guildId,
            });

            return interaction.channel.send(
              `Success! The old prefix was removed and replaced by the default one! \`>>\``
            );
          } else if (!data) {
            return interaction.channel.send(
              `Sorry! But you are already on the default prefix!`
            );
          }
        } else if (interaction.options.getBoolean("remove") === false) {
          return interaction.channel.send(
            "If you didn't want to change the prefix then why did you even try to use this command?"
          );
        }
      } else if (interaction.options.getSubcommand() === "current") {
        const data = await prefixModel.findOne({
          guildId: interaction.guildId,
        });

        let prefix;

        if (data) {
          prefix = data.prefix;
        } else if (!data) {
          prefix = ">>";
        }
        return interaction.channel.send(`Current Prefix Is: ${prefix}`);
      }
    } catch (e) {
      interaction.member.id === process.env.OWNER_ID
        ? console.log(e)
        : interaction.followUp(
            "Sorry an error occured, please try again after some time. If the problem persists, contact us at King Noob Show#6679"
          );
    }
  },
});
