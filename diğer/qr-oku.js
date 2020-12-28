const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('superagent');
const { shorten } = require('../../ek/Util');

module.exports = class ReadQRCodeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'qr-oku',
			group: 'diğer',
			aliases: ['qroku'],
			memberName: 'qr-oku',
			description: 'QR kodunu yazıya çevirir.',
			args: [
				{
					key: 'image',
					prompt: 'Lütfen yazıya çevirmek istediğiniz QR kodunun bağlantısını yazın!',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
		const { body } = await request
			.get('https://api.qrserver.com/v1/read-qr-code/')
			.query({ fileurl: args.image });
		const data = body[0].symbol[0];
		if(!data.data) {
			const embed = new RichEmbed()
				embed.setTitle(`Herhangi bir sonuç bulunamadı!`)
				embed.setColor("RANDOM")
				embed.setTimestamp()
				embed.setFooter(`${this.client.user.username}`)
			msg.embed(embed)
			return
		}
		const embed = new RichEmbed()
			embed.setTitle(`${shorten(data.data, 2000 - (msg.author.toString().length + 2))}`)
			embed.setColor("RANDOM")
			embed.setTimestamp()
			embed.setFooter(`${this.client.user.username}`)
		msg.embed(embed);
	}
};
