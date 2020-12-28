const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kara-liste',
			aliases: ['blacklist','blacklist-user'],
			group: 'admin',
			memberName: 'kara-liste',
			description: 'Belirtilen kullanıcıyı kara-listeye alır. Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'user',
					prompt: 'Kim blackliste alınsın?\n',
					type: 'user'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		if (this.client.isOwner(user.id)) return msg.reply('Bot sahibi kara listeye alınamaz.');

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return msg.reply('Bu kişi zaten kara listede bulunuyor.');

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);
    var embed = new Discord.RichEmbed()
  .setAuthor(msg.author.tag,msg.author.avatarURL)
.setColor(this.client.bilgiler.renk)
.setDescription(`
**${user.tag}** adlı kullanıcı bottan kalıcı olarak başarılı bir şekilde yasaklandı ${this.client.bilgiler.ban}

Bunun sonucunda **${user.tag}** adlı kullanıcı botun fonksiyonlarını kullanamayacak. Önemi olacağını düşündüğüm bir kaç bilgi;
**•** **efy!beyaz-liste** komutu ile **${user.tag}** adlı kullanıcıyı **kara liste**'den çıkarabilirsin.
`)
	msg.channel.send(embed);
    return;
	}
};