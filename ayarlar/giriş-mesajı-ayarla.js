const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'giriş-mesaj-ayarla',
            group: 'ayarlar',
            memberName: 'giriş-mesaj-ayarla',
            description: 'Giriş mesajını ayarlamanızı sağlar.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'mesaj',
                    prompt: 'Giriş mesajı ne olarak belirlensin? _(Örnek: <kullanıcı> <sunucu> adlı sunucuya hoş geldin! Seninle birlikte <üye> olduk.)_',
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
        const vt = this.client.provider.get(message.guild.id, 'girisMesaj', []);
        const db = this.client.provider.get(message.guild.id, 'girisMesajOnay', []);
        if (vt === args.sayı) {
            this.client.provider.set(message.guild.id, 'girisMesajOnay', true);
            message.channel.send(`:lock: Giriş mesajı zaten \`${args.mesaj}\` olarak ayarlı!`)
        } else {
            this.client.provider.set(message.guild.id, 'girisMesaj', args.mesaj);
            this.client.provider.set(message.guild.id, 'girisMesajOnay', true);
            return message.channel.send(`:ok_hand: Giriş mesajı başarılı bir şekilde \`${args.mesaj}\` olarak ayarlandı!`);
        }
    }
};