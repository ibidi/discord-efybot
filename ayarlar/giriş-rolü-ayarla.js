const { Command } = require('discord.js-commando');

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oto-rol-ayarla',
			aliases: ['giriş-rolü-ayarla'],
			group: 'ayarlar',
			memberName: 'oto-rol-ayarla',
			description: 'Sunucunuza katılanlar için botun otomatik rol vermesini sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Sunucuya girişte verilmesini istediğiniz rolün adını yazınız. _(botun o rolden sıralama olarak üstte olmasına bakın ayrıca botta yeterli yetki olduğuna emin olun!)_\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRol', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				msg.channel.send(`:lock: Giriş rolü zaten **${args.rol.name}** olarak ayarlı.`);
			} else {
				this.client.provider.set(msg.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
				return msg.channel.send(`:ok_hand: Giriş rolü **${args.rol.name}** olarak ayarlandı.`);
			}
	}
};