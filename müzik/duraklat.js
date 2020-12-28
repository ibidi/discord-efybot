const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'duraklat',
            aliases: ['pause'],
            group: 'müzik',
            memberName: 'duraklat',
            description: 'Çalmakta olan şarkıyı durdurur. efy!devam-et yazarak devam ettirir.',
            examples: ['duraklat']
        });
    }

    async run(msg, args) {
    var queue;
    queue = global.queue
        const serverQueue = queue.get(msg.guild.id);
        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(' Şarkı başarılı bir şekilde duraklatıldı.');
		}
return msg.channel.send('<:basarisiz:664584514764275718> Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.');
    }
};