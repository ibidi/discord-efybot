const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'devamet',
            aliases: ['devam'],
            group: 'müzik',
            memberName: 'devamet',
            description: 'Bağlantısı girilen/ismi girilen şarkıyı oynatır.',
            examples: ['devamet']
        });
    }

    async run(msg, args) {
    var queue;
    queue = global.queue
        const serverQueue = queue.get(msg.guild.id);
        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('<:basarili:664584487484784722> Şarkı başarıyla devam ettiriliyor.');
		}
        return msg.channel.send('<:basarisiz:664584514764275718> Lütfen herhangi bir sesli kanala katılın.');
	}
};