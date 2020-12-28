const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sayaç-kanal-ayarla',
			group: 'ayarlar',
			memberName: 'sayaç-kanal-ayarla',
			description: 'Sayaç kanalını ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Sayaç mesajları nereye gönderilsin? _(#kanalismi şeklinde yazınız.)_',
					type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }

	async run(message, args) {
			const vt = this.client.provider.get(message.guild.id, 'sayacKanal', []);
			const db = this.client.provider.get(message.guild.id, 'sayacKanalOnay', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(message.guild.id, 'sayacKanalOnay', true);
				message.channel.send(`:lock: Sayaç kanalı zaten <#${args.kanal.id}> adlı kanal olarak ayarlı!`);
			} else {
				this.client.provider.set(message.guild.id, 'sayacKanal', args.kanal.id);
				this.client.provider.set(message.guild.id, 'sayacKanalOnay', true);
				return message.channel.send(`:ok_hand: Sayaç kanalı <#${args.kanal.id}> kanalı olarak ayarlandı.`);
			}
	}
};