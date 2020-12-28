const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const { randomRange, verify } = require('../../util/Util');

module.exports = class BattleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'düello',
			group: 'eğlence',
			memberName: 'düello',
			description: 'Etiketlediğiniz kullanıcı ile düello yaparsınız.',
      
			args: [
				{
					key: 'opponent',
					prompt: 'Hangi kullanıcı ile düello yapmak istersin?',
					type: 'user',
				}
			]
		});

		this.fighting = new Set();
	}

	async run(message, { opponent }) {
                          dbl.hasVoted(message.author.id).then(async voted => {
      if (voted) {
		if (opponent.id === message.author.id) return message.reply('Kendin ile düello yapamazsın!');
		if (this.fighting.has(message.channel.id)) return message.reply('Kanal başına sadece bir düello meydana gelebilir.');
		this.fighting.add(message.channel.id);
		try {
			if (!opponent.bot) {
                await message.say(`${opponent} Düello isteği geldi. Düelloyu kabul ediyor musun? *(evet veya hayır diye cevap veriniz.)*`);
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.say(`Düello kabul edilmedi!`);
				}
			}
			let userHP = 500;
			let oppoHP = 500  ;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) {
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					await message.say(stripIndents`
						${user}, Ne Yapmak İstersin? **saldır**, **korun**, **efsane**, Veya **pes et**
						**${message.author.username}**: ${userHP}HP
						**${opponent.username}**: ${oppoHP}HP
					`);
					const filter = res =>
						res.author.id === user.id && ['saldır', 'korun', 'efsane', 'pes et'].includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await message.say(`Üzgünüm ama süre doldu.`);
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = ['saldır', 'korun', 'efsane'];
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
					await message.say(`${user}, Kılıcıyla **${damage}** Hasar verdi.`);
					dealDamage(damage);
					reset();
				} else if (choice === 'korun') {
					await message.say(`${user}, Kalkanını kuşandı ve korundu.`);
					guard = true;
					reset(false);
				} else if (choice === 'efsane') {
					const miss = Math.floor(Math.random() * 4);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
						await message.say(`Vov! ${user}, Efsane gücünü kullanarak **${damage}** hasar verdi.`);
						dealDamage(damage);
					} else {
						await message.say(`${user}, Yeterli gücü toplayamadığın için hamle yapamadın.`);
					}
					reset();
				} else if (choice === 'pes et') {
					await message.say(`${user}, Senden korktu ve kaçtı.`);
					forfeit();
					break;
				} else {
					await message.say('Ne yapmak istediğini anlayamadım.');
				}
			}
			this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
			return message.say(`Oyun bitti. **${winner}** Kazandı! \n**${message.author.username}**: ${userHP}HP \n**${opponent.username}**: ${oppoHP}HP`);
		} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
                                      }  else {
    return message.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
	}
};