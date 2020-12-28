const { Command } = require('discord.js-commando');

module.exports = class ModerationCleanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'temizle',
			aliases: ['mesajsil', 'mesajlarısil', 'sil', 'sil'],
			group: 'moderasyon',
			memberName: 'temizle',
			description: 'Mesajları siler.',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'limit',
					prompt: 'Kaç mesaj silmek istersiniz?\n',
					type: 'integer'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		const sayi1 = args.limit;
		const sayi  = Number(sayi1);
		if (sayi < 2) return msg.channel.send('En az 2 mesaj silebilirim.');
		if (sayi > 100) return msg.channel.send('En fazla 100 mesaj silebilirim.');
		if (sayi < 100) {
			msg.channel.send(sayi + ' adet mesaj aranıyor...').then(smsg => {
				msg.channel.fetchMessages({limit: parseInt(sayi) + 2}).then(messages => {
					smsg.edit(parseInt(messages.size) - 2 + ' adet mesaj bulundu. Bulunan mesajlar siliniyor...').then(bmsg => {
						msg.channel.bulkDelete(messages.size, true).then(deletedMessages => {
							if (deletedMessages.size < 1) return bmsg.edit('Hiç mesaj silinemedi. _(Tahminen 14 günden daha eski mesajlar var ise bundan dolayı mesajlar silinememiş olabilir.)_').then(msg => msg.delete(3000));
							const mesajadet = parseInt(deletedMessages.size) - 2;
							msg.channel.send(':ok_hand: '+mesajadet + ' adet mesaj silindi!').then(msg => msg.delete(3000));	
						})
					})
				});
			});
		} else {
			msg.channel.send(sayi + ' adet mesaj sorgulanıyor...').then(smsg => {
				msg.channel.fetchMessages({limit: parseInt(sayi)}).then(messages => {
					smsg.edit(parseInt(messages.size) + ' adet mesaj bulundu. Bulunan mesajlar siliniyor...').then(bmsg => {
						msg.channel.bulkDelete(messages.size, true).then(deletedMessages => {
							if (deletedMessages.size < 1) return bmsg.edit('Hiç mesaj silinemedi. _(Tahminen 14 günden daha eski mesajlar var ise bundan dolayı mesajlar silinememiş olabilir.)_').then(msg => msg.delete(3000));
							const mesajadet = parseInt(deletedMessages.size);
							msg.channel.send(':ok_hand: '+ mesajadet + ' adet mesaj silindi!').then(msg => msg.delete(300));	
						})
					})
				});
			});
		}
	}
};