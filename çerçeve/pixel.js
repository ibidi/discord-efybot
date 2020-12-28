const commando = require('discord.js-commando');
const Discord = require("discord.js");
const Jimp = require("jimp");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pixel',
            aliases: [],
            group: 'çerçeve',
            memberName: 'pixel',
            description: 'Profil fotoğrafınıza Pixel efekti verir.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Kimin profil fotoğrafına pixel efekti yapmak istiyorsun?\n',
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
                msg.channel.send(`:mag_right: **Pixel** efekti uygulanıyor, lütfen bekleyiniz.`).then(m => m.delete(3000));

      Jimp.read(user.avatarURL, function (err, image){
          image.resize(295, 295)
          if(err) return msg.channel.send('<a:basarisiz:596887378476400651> Bir hata oluştu: ``'+err+'``\n Lütfen yapımcıya bildiriniz..');
          image.pixelate(10, 10, 10).write('./x-pixel/pixel.png');
          setTimeout(() => {
            msg.channel.send({file: './x-pixel/pixel.png'});
          }, 500);
      });
                                                                      }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
};
};