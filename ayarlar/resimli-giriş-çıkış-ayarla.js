const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resimli-giriş-çıkış-ayarla',
			aliases: ['resimli-hoş-geldin-ayarla'],
			group: 'ayarlar',
			memberName: 'resimli-giriş-çıkış-ayarla',
			description: 'Giriş çıkış kanalı ayarlamanızı/değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'kanal',
					prompt: 'Resimli giriş çıkış kanalı hangi kanal olsun? _(#kanalismi şeklinde yazınız)_',
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
			const vt = this.client.provider.get(message.guild.id, 'girisCikiss', []);
			const db = this.client.provider.get(message.guild.id, 'girisCikisK', []);
			if (vt === args.kanal.id) {
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				message.channel.send(`:lock: Resimli giriş çıkış kanalı zaten **<#${args.kanal.id}>** kanalı olarak ayarlı.`);
			} else {
				this.client.provider.set(message.guild.id, 'girisCikiss', args.kanal.id);
				this.client.provider.set(message.guild.id, 'girisCikisK', true);
				return message.channel.send(`:ok_hand: Resimli giriş çıkış kanalı **<#${args.kanal.id}>** kanalı olarak ayarlandı.`);
			}
	}
};