const commando = require('discord.js-commando');
const Discord = require("discord.js");
const Jimp = require("jimp");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wanted',
            aliases: [],
            group: 'çerçeve',
            memberName: 'wanted',
            description: 'Profil fotoğrafınıza Wanted efekti verir.',
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

  msg.channel.send(`:mag_right: **Wanted** efekti uygulanıyor, lütfen bekleyiniz.`).then(m => m.delete(3000));
  
  Jimp.read(`https://cdn.discordapp.com/attachments/469606974548344853/501026267798175756/aranuyr.png`, (err, image) => {
    image.resize(295, 295)

    Jimp.read(user.avatarURL, (err, avatar) => {
        avatar.resize(179, 135)
        image.composite(avatar, 56, 100).write(`./img/araniyor/discord.gg/B2Vz2ug-${user.username}.png`);
        setTimeout(function() {
            msg.channel.send(new Discord.Attachment(`./img/araniyor/discord.gg/B2Vz2ug-${user.username}.png`));

        }, 1000);
      });
    });
                                                              }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
};
}