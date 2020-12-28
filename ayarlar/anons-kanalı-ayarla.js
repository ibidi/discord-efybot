const { Command } = require('discord.js-commando');

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anons-kanal-ayarla',
            aliases: ['anonskanal'],
            group: 'ayarlar',
            memberName: 'anons-kanal-ayarla',
            description: 'Anons kanalını değiştirmenizi/ayarlamanızı sağlar.',
            guildOnly: true,
			throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'channel',
                    prompt: 'Hangi kanal anons kanalı olarak kullanılsın? _(#kanalismi şeklinde yazınız.)_',
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
        
        const { channel } = args;
        message.guild.settings.set('anonsKanal', channel.id);
        return message.channel.send(`:ok_hand: Anons kanalı <#${channel.id}> kanalı olarak ayarlandı.`);
    }
};