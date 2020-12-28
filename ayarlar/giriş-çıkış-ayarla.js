const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'giriş-çıkış-ayarla',
            group: 'ayarlar',
            memberName: 'giriş-çıkış-ayarla',
            description: 'Giriş çıkış kanalını ayarlamanızı sağlar.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 10
            },

            args: [
                {
                    key: 'kanal',
                    prompt: 'Giriş çıkış mesajları nereye gönderilsin? _(#kanalismi şeklinde yazınız.)_',
                    type: 'channel',
                }
            ]
        });
    }

    hasPermission(msg) {
        if (!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(message, args) {
        const vt = this.client.provider.get(message.guild.id, 'girisCikis', []);
        const db = this.client.provider.get(message.guild.id, 'girisCikisOnay', []);
        if (vt === args.kanal.id) {
            this.client.provider.set(message.guild.id, 'girisCikisOnay', true);
            message.channel.send(`:lock: Giriş çıkış kanalı zaten <#${args.kanal.id}> adlı kanal olarak ayarlı!`);
        } else {
            this.client.provider.set(message.guild.id, 'girisCikis', args.kanal.id);
            this.client.provider.set(message.guild.id, 'girisCikisOnay', true);
            return message.channel.send(`:ok_hand: Giriş çıkış kanalı <#${args.kanal.id}> kanalı olarak ayarlandı!`);
        }
    }
};