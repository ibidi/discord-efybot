const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reklam-filtresi-ayarla',
			aliases: ['reklam-filtresi','reklam-engelle','reklamengelle'],
			group: 'ayarlar',
			memberName: 'reklam-filtresi-ayarla',
			description: 'Reklam engelle sistemini değiştirmenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'string',
					prompt: 'Reklam filtresini ne yapmak istersin? *(aç veya kapat yazınız)*',
					type: 'string',
					max: '3',
					min: '2'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		if (args.string === "aç" || args.string === "kapat") {
			if (args.string === "aç") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', '1'); // true false olarak ayarla istersen
				return msg.channel.send(`:ok_hand: Reklam filtresi açıldı.`);
			}
			if (args.string === "kapat") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', '0');
				return msg.channel.send(`Reklam filtresi kapatıldı.`);
			}
		} else {
			msg.channel.send('Bilinmeyen cevap.')
		}
	}
};