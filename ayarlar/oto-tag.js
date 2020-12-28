const { Command } = require('discord.js-commando');
const botConfig = require("../../_messages.json")

module.exports = class otoTag extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-tag',
			aliases: ["ototag", "oto-tag-ayarla", "ototagayarla"],
			group: 'ayarlar',
			memberName: 'oto-tag',
			description: 'Sunucuya girenlere otomatik olarak tag değiştirmenizi/ayarlamanızı sağlar. **YENI**',
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'string',
					prompt: 'Üyelere girişte verilecek olan tag ne olsun?\n(bu ayarı sıfırlamak istiyorsanız sadece **sıfırla** yazmanız yeterli olacaktır.)',
					type: 'string',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
    const tag = args.string;
    if(tag === 'sıfırla') {
      msg.guild.settings.remove('otoTag'); // ne kütüphanesi
      return msg.channel.send(this.client.bilgiler.evet + 'Oto tag başarılı bir şekilde sıfırlandı.')
    }
		this.client.provider.set(msg.guild.id, 'otoTag', tag);
    msg.say('Oto tag başarılı bir şekilde **' + tag + '** olarak ayarlandı.')
		
	}
};