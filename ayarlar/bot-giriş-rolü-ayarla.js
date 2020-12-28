const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bot-giriş-rolü-ayarla',
			aliases: ['bot-rolü-ayarla'],
			group: 'ayarlar',
			memberName: 'bot-giriş-rolü-ayarla',
			description: "Sunucunuza katılan botlara otomatik rol verilmesini sağlar.",
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Suncuya giren bota girişte verilmesini istediğiniz rolün ismini yazın. _(botun o rolden sıralama olarak üstte olmasına bakın ayrıca botta yeterli yetki olduğuna emin olun!)_\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRolbot', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolbotK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolbotK', true);
				msg.channel.send(`:lock: Bot giriş rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisRolbot', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolbotK', true);
				return msg.channel.send(`:ok_hand: Bot giriş rolü **${args.rol.name}** olarak ayarlandı.`);
			}
	}
};