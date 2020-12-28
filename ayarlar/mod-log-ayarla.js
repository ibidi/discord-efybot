const { Command } = require('discord.js-commando');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mod-log-ayarla',
			aliases: ['modlogayarla', 'modlog', 'mod-log'],
			group: 'ayarlar',
			memberName: 'mod-log-ayarla',
			description: 'Mod-log kanalını değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Hangi kanalı mod logları kayıtları için ayarlamak istersin? _(#kanalismi şeklinde yazınız.)_',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
		var ch = await args.channel;
		if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
			const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
			const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'modLogK', true);
				msg.channel.send(`:lock: Mod-log kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'modLog', args.channel.id);
				this.client.provider.set(msg.guild.id, 'modLogK', true);
				return msg.channel.send(`:ok_hand: Mod log dökümü **<#${args.channel.id}>** kanalı olarak ayarlandı.`);
			}
	}
};