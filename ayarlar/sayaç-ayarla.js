const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sayaç-ayarla',
			group: 'ayarlar',
			memberName: 'sayaç-ayarla',
			description: 'Sayaç sistemini ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'sayı',
					prompt: 'Üye hedefi ne olarak belirlensin? _(Örnek: 100)_',
					type: 'integer',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'sayacSayi', []);
			const db = this.client.provider.get(message.guild.id, 'sayacSayiOnay', []);
			if (vt === args.sayı) {
				this.client.provider.set(message.guild.id, 'sayacSayiOnay', true);
				message.channel.send(`:lock: Sayaç sayısı zaten \`${args.sayı}\` olarak ayarlı!`)
			} else {
				this.client.provider.set(message.guild.id, 'sayacSayi', args.sayı);
				this.client.provider.set(message.guild.id, 'sayacSayiOnay', true);
				return message.channel.send(`:ok_hand: Sayaç sayısı başarıyla \`${args.sayı}\` sayısı olarak ayarlandı!`);
			}
  }
	};