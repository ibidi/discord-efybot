const { Command } = require('discord.js-commando');
const botConfig = require("../../_messages.json")

module.exports = class botKoruma extends Command {
	constructor(client) {
		super(client, {
			name: 'bot-koruma-kanalı-ayarla',
			aliases: [],
			group: 'koruma',
			memberName: 'bot-koruma-kanalı-ayarla',
			description: 'Sunucuya izinsiz katılan botların listesini bir kanala gönderir.',
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'channel',
					prompt: 'İzinsiz bir bot sunucuya giriş yaptığında hangi kanala göndersin?',
                    type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		const message = msg;
		var ch = await args.channel;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
		const vt = this.client.provider.get(message.guild.id, 'botKorumaKanal', []);
		const db = this.client.provider.get(message.guild.id, 'botKorumaOnay', []);
			if (vt === args.channel.id) {
				this.client.provider.set(message.guild.id, 'botKorumaOnay', true);
				msg.channel.send(`:lock: Bot koruma kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'botKorumaKanal', args.channel.id);
				this.client.provider.set(message.guild.id, 'botKorumaOnay', true);
				return msg.channel.send(`:ok_hand: Bot koruma **<#${args.channel.id}>** kanalı olarak ayarlandı.`);
			}
	}
};