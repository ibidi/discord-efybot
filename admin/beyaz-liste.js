const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class WhitelistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'beyaz-liste',
			aliases: ['whitelist','whitelist-user','beyazliste'],
			group: 'admin',
			memberName: 'beyaz-liste',
			description: 'Belirtilen kullanıcıyı kara-listeden çıkarır. Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'Kimi kara-listeden kurtarmak istersiniz?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (!blacklist.includes(user.id)) return msg.reply('Bu kullanıcı kara listede değil.');

		const index = blacklist.indexOf(user.id);
		blacklist.splice(index, 1);

		if (blacklist.length === 0) this.client.provider.remove('global', 'userBlacklist');
		else this.client.provider.set('global', 'userBlacklist', blacklist);

    var embed = new Discord.RichEmbed()
  .setAuthor(msg.author.tag,msg.author.avatarURL)
.setColor(this.client.bilgiler.renk)
.setDescription(`
**${user.tag}** adlı kullanıcının yasaklanması başarılı bir şekilde kaldırıldı ${this.client.bilgiler.evet}

Bunun sonucunda **${user.tag}** adlı kullanıcı botun fonksiyonlarını kullanabilecek. Önemi olacağını düşündüğüm bir kaç bilgi;
**•** **efy!kara-liste** komutu ile **${user.tag}** adlı kullanıcıyı **kara liste**'ye alabilirsin.
`)
	msg.channel.send(embed);
    return;
	}
};