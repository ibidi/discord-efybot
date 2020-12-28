const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'güncelleme',
			group: 'bilgi',
			memberName: 'güncelleme',
      				aliases: [],
			description: 'Bota gelen en sonki güncelleme hakkında bilgiler verir.',
			examples: [],
			guildOnly: true,
			guarded: true,
		});
	}

	async run(msg, args) {
    //msg.channel.send("<:duyuru:650418642890260482> Bota gelen en son güncellemeyi <\#650381152569524254> kanalından daha detaylı öğrenebilirsin.\n**EfyBot Destek sunucusunun giriş anahtarı:** https://discord.gg/rHnySnr")
  const s = msg.guild.channels.get('656949731037020165')
  const s1 = msg.guild.channels.get('656949731037020165').lastMessageID
    s.fetchMessage(s1).then(m => {
        msg.channel.send(m.content)
    });
  }
}