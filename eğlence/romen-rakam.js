const { Command } = require('discord.js-commando');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const numerals = require('../../assets/json/roman-numeral');

module.exports = class RomanNumeralCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'romen-rakam',
			aliases: ['roman'],
			group: 'eğlence',
			memberName: 'romen-rakam',
			description: 'İstediğiniz bir sayıyı roman rakamına çevirir.',
			args: [
				{
					key: 'number',
					prompt: 'Romen rakamıyla yazılacak sayıyı yazın.\n_beta sürümü_',
					type: 'integer',
					min: 0,
					max: 4999
				}
			]
		});
	}

	run(msg, { number }) {
                                    dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
		if (number === 0) return msg.say('_nulla_');
		let result = '';
		for (const [numeral, value] of Object.entries(numerals)) {
			while (number >= value) {
				result += numeral;
				number -= value;
			}
		}
		return msg.say(result);
                                                                  }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
	}
};