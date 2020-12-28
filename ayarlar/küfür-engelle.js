const { Command } = require('discord.js-commando');
const botConfig = require("../../_messages.json")

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'küfür-engelle',
			aliases: [],
			group: 'ayarlar',
			memberName: 'küfür-engelle',
			description: 'Küfür engelle sistemini değiştirmenizi/ayarlamanızı sağlar.',
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'string',
					prompt: 'Yasaklı kelime filtresini ne yapmak istersin? *(aç veya kapat yazınız)*',
					type: 'string',
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
				const vt = this.client.provider.get(msg.guild.id, 'swearSensor', []);
				this.client.provider.set(msg.guild.id, 'swearSensor', '1');
				return msg.channel.send(`:ok_hand: Yasaklı kelime filtresi açıldı.`);
			}
			if (args.string === "kapat") {
				const vt = this.client.provider.get(msg.guild.id, 'swearSensor', []);
				this.client.provider.set(msg.guild.id, 'swearSensor', '0');
				return msg.channel.send(`Yasaklı kelime filtresi kapatıldı.`);
			}
		} else {
			msg.channel.send('Bilinmeyen cevap. Lütfen tekrar deneyin')
		}
	}
};