const { Command } = require("reconlx");

module.exports = new Command({
  name: "no-u",
  description: "No u",
  userPermissions: ["SEND_MESSAGES"],
  category: "Fun",
  usage: "/no-u [user]",
  options: [
    {
      name: "mention",
      description: "No U <Mention Here>",
      type: "USER",
      required: false,
    },
    {
      name: "id",
      description: "Can't mention them? Use id!",
      type: "STRING",
      required: false,
    },
  ],
  run: async ({ client, interaction, args }) => {
    let user = String;

    if (interaction.options.getMember("mention")) {
      const uu = interaction.options.getMember("mention");
      user = `<@${uu.id}>`;
    } else if (interaction.options.getString("id")) {
      const i = interaction.options.getString("id");
      let ii = interaction.guild.members.cache.get(i);
      user = `<@${ii.id}>`;
    } else {
      user = "";
    }

    await interaction.followUp("Loading...");
    await interaction.deleteReply();
    await interaction.channel.send({ content: `No U ${user}` });
  },
});
