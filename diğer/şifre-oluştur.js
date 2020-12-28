const commando = require('discord.js-commando');
const crypto = require('crypto');

module.exports = class keyCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'şifre-oluştur',
			aliases: ['şifre'],
			group: 'diğer',
			memberName: 'şifre-oluştur',
			description: 'Rastgele bir şifre oluşturmanızı sağlar.'
		});
	}

	run(msg) {
		return msg.say(crypto.randomBytes(15).toString('hex'));
	}
};