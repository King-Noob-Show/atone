const { Command } = require("reconlx");

module.exports = new Command({
    name: 'ban',
    description: 'Ban a person',
    userPermissions: ["BAN_MEMBERS"],
    catagory: 'Moderation',
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
        const reason = interaction.options.getString('reason') || 'No reason Provided'
        await interaction.followUp(`I wont ban ${interaction.options.getUser('user')} because I am ${client.user.tag} and the reason is also bad Reason :- ${reason}`)
    },
})