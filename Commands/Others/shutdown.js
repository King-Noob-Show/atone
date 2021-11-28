const { Command } = require("reconlx");
const dotenv = require("dotenv");
dotenv.config();

module.exports = new Command({
  name: "shutdown",
  description: "A command for the owner to shutdown the bot.",
  userPermissions: ["ADMINISTRATOR"],
  category: "Others",
  usage: "/shutdown",
  run: async ({ client, interaction, args }) => {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return interaction.followUp({
        content: "You cannot use this command!",
        ephemeral: true,
      });
    }
    interaction.followUp({
      content: "Shutting Down Bot.......",
      ephemeral: false,
    });
    interaction.editReply({
      content: "Bot Has Been Shut Down!",
      ephemeral: false,
    });
    process.exit();
  },
});
