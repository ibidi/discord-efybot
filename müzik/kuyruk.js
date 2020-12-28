const { Command } = require('discord.js-commando')
const Discord = require('discord.js');
const Util = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kuyruk',
            aliases: ['queue'],
            group: 'müzik',
            memberName: 'kuyruk',
            description: 'Şarkı kuyruğunu gösterir.',
            examples: ['kuyruk']
        });
    }

    async run(msg, args) {
      var queue;
      queue = global.queue
        const serverQueue = queue.get(msg.guild.id);
        if (!serverQueue) return msg.channel.send(`<:basarisiz:664584514764275718> Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.`);
      var embed = new Discord.RichEmbed()
      .setColor(this.client.bilgiler.renk)
      .setDescription(`__**Şarkı Kuyruğu:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

<:efy_youtube:668310349468139530> **Oynatılan şarkı:** ${serverQueue.songs[0].title}`)
      msg.channel.send(embed)
    }
};