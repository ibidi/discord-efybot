const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'starboard-sayı-ayarla',
            aliases: ['starboard-sayı-ayarla'],
            group: 'ayarlar',
            memberName: 'starboard-sayı-ayarla',
            description: 'Starboard sayısını değiştirmenizi/ayarlamanızı sağlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'sayi',
                    label: 'sayı',
                    prompt: ':star: Emojisine kaç kere tıklanınca starboard sistemi aktif edilsin?',
                    type: 'string'
                }
            ]
        });
    }
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    async run(message, args) {
        
        const { sayi } = args;
        const vt = this.client.provider.get(message.guild.id, 'starboardS', []);
        if (vt === sayi) {
            message.channel.send(`:lock: Starboard sayısı zaten \`${vt}\` olarak ayarlı!`)
        } else {
            this.client.provider.set(message.guild.id, 'starboardS', sayi);
            return message.channel.send(`:ok_hand: Starboard sayısı başarılı bir şekilde \`${sayi}\` olarak ayarlandı!`);
        }
    }
};