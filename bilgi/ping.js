const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class PingCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'bilgi',
			memberName: 'ping',
			description: 'Botun gecikmesini gösterir.',
			throttling: {
				usages: 1,
				duration: 10
			}
		});
	}


	async run(msg) {
		const pingMsg = await msg.reply('Hesaplanıyor...');
		return pingMsg.edit(oneLine`
			${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
			Hey! Botun son gecikmesi: **${Math.ceil(this.client.ping)}ms.**`);
	}
};