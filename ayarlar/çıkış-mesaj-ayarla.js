const { Command } = require('discord.js-commando');
    
module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çıkış-mesaj-ayarla',
            group: 'ayarlar',
            memberName: 'çıkış-mesaj-ayarla',
            description: 'Çıkış mesajını ayarlamanızı sağlar.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'mesaj',
                    prompt: 'Çıkış mesajı ne olarak belirlensin? _(Örnek: <kullanıcı>, <sunucu> adlı sunucudan ayrıldı! Gidişin ile <üye> kaldı!)_',
                    type: 'string',
                }
            ]
        });
    }

    hasPermission(msg) {
        if (!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(message, args) {
        const vt = this.client.provider.get(message.guild.id, 'cikisMesaj', []);
        const db = this.client.provider.get(message.guild.id, 'cikisMesajOnay', []);
        if (vt === args.sayı) {
            this.client.provider.set(message.guild.id, 'cikisMesajOnay', true);
            message.channel.send(`:lock: Çıkış mesajı zaten \`${args.mesaj}\` olarak ayarlı!`)
        } else {
            this.client.provider.set(message.guild.id, 'cikisMesaj', args.mesaj);
            this.client.provider.set(message.guild.id, 'cikisMesajOnay', true);
            return message.channel.send(`:ok_hand: Çıkış mesajı başarılı bir şekilde \`${args.mesaj}\` olarak ayarlandı!`);
        }
    }
};