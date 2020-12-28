const { Command } = require('discord.js-commando')
const Discord = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'müzik-ses',
            aliases: ['vol', 'volume'],
            group: 'müzik',
            memberName: 'müzik-ses',
            description: 'Oynatılan/çalınan şarkının sesini ayarlar.',
            examples: ['müzik-ses 5'],
            args: [
                {
                    key: 'ses',
                    label: 'ses',
                    prompt: 'Ses düzeyi ne olsun?',
                    type: 'integer',
                    min: 0,
                    max: 5
                }
            ]
        });
    }

    async run(msg, args) {
        const serverQueue = this.queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) 
      var embed = new Discord.RichEmbed()
      .setDescription(this.client.bilgiler.hayır+" Lütfen herhangi bir sesli kanala katılın.")
      msg.channel.send(embed)
		if (!serverQueue) return msg.channel.send(this.client.bilgiler.hayır+` Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.`);
        serverQueue.volume = args.ses
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args.ses / 5); 
      var embed2 = new Discord.RichEmbed()
            .setColor(this.client.bilgiler.renk)
      .setDescription(`Ses seviyesi başarıyla **${args.ses}** olarak ayarlandı.`)
      msg.channel.send(embed2)
      return;
    }
};