const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'geç',
            aliases: ['skip', 'gec'],
            group: 'müzik',
            memberName: 'geç',
            description: 'Çalan şarkıyı geçer.',
            examples: ['geç']
        });
    }

    async run(message, args) {
    var queue;
    queue = global.queue
    var serverQueue = queue.get(message.guild.id);
        
    if (!serverQueue) return message.channel.send(this.client.bilgiler.hayır+` Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.`);
    
    serverQueue.connection.dispatcher.end('');
    return message.channel.send(`:ok_hand: Şarkı başarıyla geçildi.`);
    
  };
};