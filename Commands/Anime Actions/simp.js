const { Command } = require("reconlx");
const { loadImage, createCanvas } = require("canvas");
const { MessageAttachment } = require("discord.js");

module.exports = new Command({
  name: "simpcard",
  description: "Generate a simpcard.",
  userPermissions: ["ATTACH_FILES"],
  category: "Anime Actions",
  usage: "/simpcard [user]",
  options: [
    {
      name: "user",
      description: "The user that is a simp.",
      type: "USER",
      required: false,
    },
  ],

  run: async ({ client, interaction, args }) => {
    const member = interaction.options.getUser("user") || interaction.user;
    const avatar = await loadImage(member.displayAvatarURL({ format: "jpg" }));

    let bg = await loadImage(
      "https://cdn.discordapp.com/attachments/765926464628719627/855686984042938368/Simp_Pop_Cat.png"
    );

    const canvas = createCanvas(775, 575);
    const ctx = canvas.getContext(`2d`);

    ctx.drawImage(bg, 0, 0, 775, 575);
    ctx.drawImage(avatar, 30, 50, 303, 455);

    const attachment = new MessageAttachment(canvas.toBuffer(), "simpcard.jpg");

    interaction.followUp({ files: attachment });
  },
});
