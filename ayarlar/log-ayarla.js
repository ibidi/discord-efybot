const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'log-ayarla',
			aliases: ['logayarla', 'log', 'logs'],
			group: 'ayarlar',
			memberName: 'log-ayarla',
			description: 'Log kanalını değiştirmenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'log kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
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
		if (ch.type == 'voice') return msg.reply(this.client.bilgiler.hayır+' Sesli kanallar seçilemez!');
        if (args.channel) {
			const vt = this.client.provider.get(msg.guild.id, 'logsChannel', []);
			const db = this.client.provider.get(msg.guild.id, 'logsEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'logsEnable', true);
				msg.channel.send(this.client.bilgiler.hayır+` Log kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'logsChannel', args.channel.id);
				this.client.provider.set(msg.guild.id, 'logsEnable', true);
				return msg.channel.send(this.client.bilgiler.evet+` Log olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};