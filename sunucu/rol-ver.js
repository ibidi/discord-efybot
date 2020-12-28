const { Command } = require('discord.js-commando');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rol-ver',
            group: 'sunucu',
            memberName: 'rol-ver',
            description: 'Bir kullanıcıya rol verirsiniz.',
            guildOnly: true,
						throttling: {
                usages: 3,
                duration: 5
            },
            args: [{
                    key: 'member',
                    prompt: 'Kime rol vermek istiyorsun?',
                    type: 'member'
                },
                {
                    key: 'role',
                    prompt: 'Vereceğin rolün adını yaz!',
                    type: 'role'
                }
            ]
        });
    }

    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_ROLES');
    }
    
    async run(message, args) {
        const { member, role } = args;
        if (member.roles.has(role.id)) return message.channel.send(`:lock: **${member.displayName}** zaten **${role.name}** rolüne sahip.`)

        try {
            await member.addRole(role)
            return message.channel.send(`:ok_hand: **${member.displayName}** kişisine **${role.name}** rolü verildi!`)
        } catch (err) {
            return message.channel.send(`:lock: **${member.displayName}** zaten **${role.name}** rolüne sahip/veremiyor!`)
        }
    };
};