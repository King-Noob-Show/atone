const { Command } = require("reconlx");

module.exports = new Command({
    name: 'ban',
    description: 'Ban a person',
    userPermissions: ["BAN_MEMBERS"],
    catagory : "Moderation",
    options: [
        {
            type: 'USER',
            name: 'user',
            description: 'The user to ban!',
            required: true
        },
        {
            type: 'STRING',
            name: 'reason',
            description: 'The reason to ban!',
            required: false
        }
    ],
    run: async ({client, interaction, args}) => {
        const target = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason Provided';

        if (!target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.followUp({content: `You cannot ban ${target.nickname} because their roles are either equal or higher than yours!`, ephemeral: true})
        if (!target.bannable || target.user.id === client.user.id) return interaction.followUp({content: `I am sorry but i cannot ban ${target.nickname}!`, ephemeral: true})

        await target.send(`You have been banned from ${interaction.guild.name} for ${reason}`)
        target.ban({ reason })
        interaction.followUp(`${target. user.tag} has been banned from ${interaction.guild.name} for ${reason}!`)
    },
})