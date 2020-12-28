const commando = require('discord.js-commando');
const Discord = require("discord.js");
const Jimp = require("jimp");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const GIFEncoder = require('gifencoder');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'erdoğan',
            aliases: ['erdogan'],
            group: 'çerçeve',
            memberName: 'erdoğan',
            description: 'Profil fotoğrafınıza RTE efekti verir.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Kimin profil fotoğrafına RTE fekti yapmak istiyorsun?\n',
					type: 'member'
				}
			]
        });
    }

    async run(msg, args) {
                                            dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
            	  const member = args.member;
	  
		const user = member.user;
        msg.channel.send(`:mag_right: **RTE** efekti uygulanıyor, lütfen bekleyiniz.`).then(m => m.delete(3000));

        const embed = new Discord.RichEmbed()
        .setImage('https://eggsy.codes/api/overlay/create?overlay=erdogan&url=' + user.avatarURL.toString().replace('2048', '1024&width=256&height=256'))
        msg.channel.send(embed)
                                                                      }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
    }
}