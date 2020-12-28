const commando = require('discord.js-commando');
const Discord = require("discord.js");
const Jimp = require("jimp");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wasted',
            aliases: [],
            group: 'çerçeve',
            memberName: 'wasted',
            description: 'Profil fotoğrafınıza Wasted efekti verir.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Kimin profil fotoğrafına wasted efekti yapmak istiyorsun?\n',
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

  msg.channel.send(`:mag_right: **Wasted** efekti uygulanıyor, lütfen bekleyiniz.`).then(m => m.delete(3000));
  
        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(295, 295)
            image.greyscale()
            image.gaussian(3)
            Jimp.read("https://cdn.glitch.com/b18a2fa6-68cb-49d5-9818-64c50dd0fdab%2F1.png?1529363616039", (err, avatar) => {
                avatar.resize(295, 295)
                image.composite(avatar, 4, 0).write(`./img/wasted/${user.username}-${user.id}.png`);
                setTimeout(function() {
                    msg.channel.send(new Discord.Attachment(`./img/wasted/${user.username}-${user.id}.png`));
                }, 1000);
          msg.channel.stopTyping();
            });
        });
                                                                      }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
    };
}