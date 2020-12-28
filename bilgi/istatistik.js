const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const osu = require('node-os-utils');
const { stripIndents } = require('common-tags');
require('moment-duration-format');

module.exports = class StatsCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'istatistik',
			aliases: ['bot durum', 'i', 'bi', 'istatistikler', 'kullanımlar', 'botdurum', 'bd', 'istatisik', 'stats', 'stat'],
			group: 'bilgi',
			memberName: 'istatistik',
			description: 'Botun istatistiklerini gösterir.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	async run(msg) {
    function time(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    let cpu = Math.round(process.cpuUsage().system)
    let cpupercent = Math.round((cpu * 1) / 1000) / 10;
		var message = await msg.channel.send(this.client.bilgiler.yukleniyor +` Veriler hesaplanıyor...`)
    await time(Math.floor(Math.random() * (9000) ) + 3)
		var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();

		//var guild = await this.client.shard.fetchClientValues("guilds.size")
		//var channel = await this.client.shard.fetchClientValues("channels.size")
		//var user = await this.client.shard.fetchClientValues("users.size")

		//var guilds = await guild.reduce((prev, val) => prev + val, 0);
		//var channels = await channel.reduce((prev, val) => prev + val, 0);
		//var users = await user.reduce((prev, val) => prev + val, 0);

		var embed = {
			color: 3447013,
			description: '**İstatistikler**',
			fields: [
				{
					name: '❯ Çalışma süresi',
					value: moment.duration(this.client.uptime)
						.format('D [gün], H [saat], m [dakika], s [saniye]'),
					inline: false
				},
				{
					name: '❯ Sunucu işletim sistemi',
					value: `${osType}`,
					inline: false
				},
				{
					name: '❯ Sunucu istatistikleri',
					value: `• Bellek Kullanımı: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB \n• CPU Kullanımı: %${cpupercent}`,
					inline: false
				},
				{
					name: '❯ Genel istatistikler',
					value: stripIndents`
					• Sunucu: ${this.client.guilds.size}
					• Kanal: ${this.client.channels.size}
					• Kullanıcı: ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
          • Gecikme: ${Math.ceil(this.client.ping)}
					`,
					inline: false
				},
				{
					name: '❯ Sürümler',
					value: stripIndents`
					• Discord.js: v${Discord.version}
					• Discord.js-commando: v${commando.version}
					• Node: ${process.version}
					`,
					inline: false
				}
			],
			thumbnail: { url: this.client.user.avatarURL }
		};
		
		return message.edit('', {embed});
	}
};