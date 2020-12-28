const { Command } = require('discord.js-commando');

module.exports = class DelRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rol-al',
            group: 'sunucu',
            memberName: 'rol-al',
            description: 'Bir kullanıcıdan rol alırsınız.',
            guildOnly: true,
						throttling: {
                usages: 3,
                duration: 5
            },
            args: [{
                    key: 'member',
                    prompt: 'Kimden rol almak istiyorsun?',
                    type: 'member'
                },
                {
                    key: 'role',
                    prompt: 'Alacağın rolün adını yaz.',
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
        if (!member.roles.has(role.id)) return message.channel.send(`:lock: **${member.displayName}** kişisi **${role.name}** zaten rolüne sahip değil!`)


        try {
            await member.removeRole(role)
            return message.channel.send(`:ok_hand: ${member.displayName} artık ${role.name} rolüne sahip değil!`);
        } catch (err) {
            return message.channel.send(`:lock: **${member.displayName}** kişisi ${role.name} zaten rolüne sahip değil/alamıyor!`)
        }
    };
};