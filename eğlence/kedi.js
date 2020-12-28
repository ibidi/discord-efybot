const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class CatCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kedi',
            aliases: ['random-cat', 'kedipng', 'kedijpg', '🐱'],
            group: 'eğlence',
            memberName: 'kedi',
            description: 'Rastgele bir 🐱 resmi gönderir.',
            guildOnly: false,
            throttling: {
                 usages: 1,
                 duration: 5
            }
        });
    }

    async run(msg, args) {
                      dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
		try {
			const { body } = await snekfetch
				.get('http://aws.random.cat/meow');
                let embed = {
                    color: 3447003,
                    description: `🐱`,
                    image: {
                        url: body.file,
                    }
                  };
                  return msg.channel.send({embed});
		} catch (err) {
			return msg.say(`Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
                                                          }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
    };
};