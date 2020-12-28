const { Command } = require('discord.js-commando');
const _ = require('lodash');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'destek-sistemi-kapat',
            aliases: ['desteksistemikapat'],
            group: 'oda',
            memberName: 'destek-sistemi-kapat',
            description: 'Hoş geldin kanalını kapatır.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60
            },
            args: [{
                key: 'messageID',
                prompt: 'Destek sistemine kayıtlı olan kanalı giriniz?',
                type: 'channel'
            }, ]

        });
    }

    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.isOwner(msg.author)
    }
    async run(message, args) {
        let kod = args.messageID;
        let a = message.guild.channels.find(channel => channel.id === kod.id);
        if(!a) return message.reply("Böyle bir kanalı bulamadım.");
        let data = this.client.provider.get(message.guild.id, "desteksistemi", []);
        let cmd = _.find(data, {"kanal": a.id});
        if (data) {

            _.remove(data, {"kanal": a.id});
            this.client.provider.set(message.guild.id, "desteksistemi", data);

        } else {
            return message.reply(`Bu sunucuda hiç destek sistemi oluşturulmamış.`);
        }

        message.channel.send(`**${kod}** kaldırıldı.`);
    }
}