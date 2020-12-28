const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { list } = require('../../util/Util');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const difficulties = ['kolay', 'orta', 'zor', 'çok zor', 'imkansız'];
const operations = ['+', '-', '*'];
const maxValues = {
	kolay: 10,
	orta: 100,
	zor: 500,
	çokzor: 1000,
	imkansiz: 1000000
};

module.exports = class MathQuizCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'zeka-testi',
			group: 'eğlence',
			memberName: 'zeka-testi',
			description: 'Zeka testi oyununu oynarsınız.',
			details: `**Difficulties**: ${difficulties.join(', ')}`,
			args: [
				{
					key: 'difficulty',
					prompt: `Zorluk seviyesi seçin \`${list(difficulties)}\``,
					type: 'string',
					oneOf: difficulties,
					parse: difficulty => difficulty.toLowerCase()
				}
			]
		});
	}

	async run(msg, { difficulty }) {
		const value1 = Math.floor(Math.random() * maxValues[difficulty]) + 1;
		const value2 = Math.floor(Math.random() * maxValues[difficulty]) + 1;
		const operation = operations[Math.floor(Math.random() * operations.length)];
		let answer;
		switch (operation) {
			case '+': answer = value1 + value2; break;
			case '-': answer = value1 - value2; break;
			case '*': answer = value1 * value2; break;
		}
		await msg.channel.send(stripIndents`
			**10 saniye içerisinde bevabı bulmalısın.**
			${value1} ${operation} ${value2}
		`);
    
    const now = Date.now();
		const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
			max: 1,
			time: 10000
		});
		if (!msgs.size) return msg.channel.send(`Üzgünüm Ama Süre Doldu. Cevap: \`${answer}\``);
		if (msgs.first().content !== answer.toString()) return msg.channel.send(`Üzgünüm ama cevap: \`${answer}\``);
		return msg.channel.send(`Çok iyisin \`${(Date.now() - now) / 1000}\` saniye de çözdün.`);
	}
};