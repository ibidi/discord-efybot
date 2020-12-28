const { Command } = require('discord.js-commando');

module.exports = class SetLogChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'davet-kanal-ayarla',
			aliases: ['set-invite-channel'],
			group: 'ayarlar',
			memberName: 'davet-kanal-ayarla',
			description: 'Davet kanalını ayarlamayı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Davet kanalı hangi kanal olsun? (#kanalismi şeklinde yazınız)\n',
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
			const vt = this.client.provider.get(msg.guild.id, 'davetKanal', []);
			const db = this.client.provider.get(msg.guild.id, 'davetEnable', []);
			if (vt === args.channel.id) {
				this.client.provider.set(msg.guild.id, 'davetEnable', true);
				msg.channel.send(this.client.bilgiler.hayır+` Davet kanalı zaten **${args.channel.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'davetKanal', args.channel.id);
				this.client.provider.set(msg.guild.id, 'davetEnable', true);
				return msg.channel.send(this.client.bilgiler.evet+` Davet olarak ayarlanan kanal: **${args.channel.name}**`);
			}
        }
    }
};