const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('superagent');

module.exports = class CreateQRCodeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'qr-oluştur',
			group: 'diğer',
			aliases: ['qroluştur'],
			memberName: 'qr-oluştur',
			description: 'QR kodu yaratır.',
			args: [
				{
					key: 'text',
					prompt: 'Lütfen QR koduna çevirmek istediğiniz yazıyı yazın!',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
			try {
				const { body } = await request
					.get('https://api.qrserver.com/v1/create-qr-code/')
					.query({ data: args.text });
				msg.channel.send({ files: [{ attachment: body, name: 'qr-kod.png' }] });
			} catch (err) {
				const embed = new RichEmbed()
					embed.setTitle(`Yazı QR koduna çevrilemedi!`)
					embed.setColor("RANDOM")
					embed.setTimestamp()
					embed.setFooter(`2018 - ${this.client.user.username}`)
				msg.embed(embed)
				return
			}
	}
};
