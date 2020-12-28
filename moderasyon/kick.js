const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationKickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			aliases: ['at', 'sunucudan at', 'kickle', 'kickhammer'],
			group: 'moderasyon',
			memberName: 'kick',
			description: 'İstediğiniz kişiyi sunucudan atar.',
			details: ``,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimi sunucudan atmak istersin?',
					type: 'member'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Neden bu kişiyi sunucudan atmak istiyorsun?',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("KICK_MEMBERS")
	}

	async run(msg, args) {
		let guild = msg.guild
		const member = args.member;
		const user = member.user;
		const reason = args.sebep;
		const kasa = this.client.provider.get(msg.guild.id, 'modKasa', []);
		const eskikasano = Number(kasa);
		const kasano = parseInt(eskikasano) + 1;
		this.client.provider.set(msg.guild.id, 'modKasa', kasano);
		const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
		const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
		if (db ==! "evet") return msg.channel.send('Lütfen `mod-log-ayarla` komutu ile mod-log kanalı belirleyiniz.');
		let modlog = vt;
		if (!modlog) return msg.channel.send('Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp `mod-log-ayarla` komutu ile mod-log olarak ayarlayınız.');
		if (user.id === msg.author.id) return msg.say('Kendini atamazsın.')
		if (member.highestRole.calculatedPosition > msg.member.highestRole.calculatedPosition - 1) {
			return msg.say('Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.');
		}

		if (!msg.guild.member(user).kickable) return msg.channel.send('Bu kişiyi sunucudan atamıyorum çünkü `benden daha yüksek bir role sahip` ya da `bana gerekli yetkileri vermedin`.');

		member.kick(`${msg.author.tag} (${msg.author.id}) tarafından, ${user.tag} (${user.id}) adlı kişi ${reason} nedeniyle sunucudan atıldı/kicklendi.`)
  const embed = new Discord.RichEmbed()
      .setAuthor(`Atma | ${user.tag}`, user.avatarURL)
    .addField("Kullanıcı", `${user.tag} (<@${user.id}>)`,true)
    .addField("Moderatör", `${msg.author.tag}`,true)
    .addField("Sebep", `${reason}`,true)
    .setThumbnail(user.avatarURL)
    .setFooter(`Kasa: ${kasano}`, this.client.user.avatarURL)
	.setColor('#ffac00')
		guild.channels.get(modlog).send({embed});
    member.send(':ok_hand: **' + msg.guild.name + '** sunucusunda `' + msg.author.tag + '` adlı kişi/yetkili tarafından ___' + reason + '___ sebebi ile atıldın.');
		return msg.channel.send(':ok_hand: Kullanıcı, sunucudan atıldı!');
	}
};