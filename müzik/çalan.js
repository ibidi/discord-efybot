const { Command } = require('discord.js-commando')
const Discord = require('discord.js');
const Util = require('discord.js');

module.exports = class musicCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çalan',
            aliases: [],
            group: 'müzik',
            memberName: 'çalan',
            description: 'Botun oynattığı şarkıyı görebilirsiniz.',
            examples: []
        });
    }

    async run(msg, args) {
        const serverQueue = queue.get(msg.guild.id);
        if (!msg.member.voiceChannel) return msg.channel.send('<:basarisiz:664584514764275718> Lütfen herhangi bir sesli kanala katılın.');
        if (!serverQueue) return msg.channel.send(`<:basarisiz:664584514764275718> Şuanda bulunduğunuz sesli kanalda herhangi bir şarkı oynatılmıyor/çalmıyor.`);
            var embed = new Discord.RichEmbed()
      .setColor(this.client.bilgiler.renk)
            .setDescription(`__**Çalan şarkı:**__

<:efy_youtube:668310349468139530> **${serverQueue.songs[0].title}**`)
                    .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
            msg.channel.send(embed);
    }
};