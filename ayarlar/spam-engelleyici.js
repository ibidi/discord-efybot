const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spam-engelleyici',
			aliases: ['spam-engelle'],
			group: 'ayarlar',
			memberName: 'spam-engelleyici',
			description: 'Spam engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Spam olarak algılanan mesajlar engellensin mi?(evet ya da hayır olarak cevaplayınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'Lütfen `evet` ya da `hayır` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(msg.guild.id, 'antispam', []);
				this.client.provider.set(msg.guild.id, 'antispam', true);
        this.client.provider.set(msg.guild.id, 'açık', args.string);
        return msg.channel.send(`:ok_hand: Spam engelleyici açıldı.`);
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(msg.guild.id, 'antispam', []);
				this.client.provider.set(msg.guild.id, 'antispam', false);
        this.client.provider.set(msg.guild.id, 'kapalı', args.string);
        return msg.channel.send(`Spam engelleyici kapatıldı.`);
			}
	}
};