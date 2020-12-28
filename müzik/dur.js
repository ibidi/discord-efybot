const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dur',
            aliases: ['stop'],
            group: 'müzik',
            memberName: 'dur',
            description: 'Çalmakta olan şarkıyı durdurur ve odadan çıkar.',
            examples: ['dur']
        });
    }

    async run(msg, args) {
    var queue;
    queue = global.queue
        const serverQueue = queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send(this.client.bilgiler.hayır+' Lütfen herhangi bir sesli kanala katılın.');
		if (!serverQueue) return msg.channel.send('<:basarisiz:664584514764275718> Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('<:basarili:664584487484784722> Oynatılan/çalınan şarkı başarıyla durduruldu ve odadan ayrıldım.');
        return undefined;   
    }
};