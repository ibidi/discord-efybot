const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'starboard-kanal-ayarla',
            aliases: ['starboard-kanalı-ayarla'],
            group: 'ayarlar',
            memberName: 'starboard-kanalı-ayarla',
            description: 'Starboard kanalını değiştirmenizi/ayarlamanızı sağlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    label: 'kanal',
                    prompt: 'Hangi kanal starboard kanalı olarak kullanılsın?',
                    type: 'channel'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    async run(message, args) {
        
        const channel = args.channel;
        const vt = this.client.provider.get(message.guild.id, 'starboard', []);
        const db = this.client.provider.get(message.guild.id, 'starboardA', []);
        if (vt === channel.id) {
            this.client.provider.set(message.guild.id, 'starboardA', true);
            message.channel.send(`:lock: Starboard kanalı zaten \`${channel.name}\` olarak ayarlı!`)
        } else {
            this.client.provider.set(message.guild.id, 'starboard', channel.id);
            this.client.provider.set(message.guild.id, 'starboardA', true);
            return message.channel.send(`:ok_hand: Starboard kanalı başarılı bir şekilde \`${channel.name}\` olarak ayarlandı!`);
        }
    }
};