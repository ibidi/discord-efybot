const { Command } = require('discord.js-commando');
const botConfig = require("../../_messages.json")

module.exports = class botKoruma extends Command {
	constructor(client) {
		super(client, {
			name: 'bot-koruma',
			aliases: [],
			group: 'koruma',
			memberName: 'bot-koruma',
			description: 'Sunucuya izinsiz katılan botları otomatik olarak sunucudan atar.',
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'string',
					prompt: 'Sunucuya giren botlar sunucudan direkt olarak atılsın mı? *(evet ya da hayır yazınız)*',
                    type: 'string',
                    validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'Lütfen `evet` ya da `hayır` olarak yanıtlayınız.';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		if (args.string === "evet" || args.string === "hayır") {
			if (args.string === "evet") {
				const vt = this.client.provider.get(msg.guild.id, 'botKoruma', []);
				this.client.provider.set(msg.guild.id, 'botKoruma', '1');
				return msg.channel.send(`:ok_hand: Sunucuya izinsiz giren botlar atılacak.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(msg.guild.id, 'botKoruma', []);
				this.client.provider.set(msg.guild.id, 'botKoruma', '0');
				return msg.channel.send(`Sunucuya izinsiz giren botlar artık atılmayacak.`);
			}
		}
	}
};