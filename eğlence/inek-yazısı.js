const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class CowSayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'inek-yazısı',
			group: 'eğlence',
			memberName: 'inek-yazısı',
			description: 'İnek yazısı şeklinde yazı yazarsınız.',
			args: [
				{
					key: 'text',
					prompt: 'Çevireceğiniz yazıyı yazınız.',
					type: 'string',
					max: 1500
				}
			]
		});
	}

	async run(msg, { text }) {
                    dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
		try {
			const { body } = await request
				.get('http://cowsay.morecode.org/say')
				.query({
					message: text,
					format: 'json'
				});
			return msg.code(null, body.cow);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
                                          }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
	}
};