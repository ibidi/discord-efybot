const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const snek = require('superagent');
const moment = require('moment');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'npm',
			group: 'util',
			memberName: 'npm',
			description: 'Yazdığınız NPM paketi hakkında bilgi verir.',
			examples: [],
			guildOnly: true,
			guarded: true,
		args: [
				{
					key: 'o',
					label: 'npm paketi',
					prompt: 'Bilgi almak istediğiniz npm paketini yazın!',
					type: 'string'
				}
			]
		});
	}

	async run(msg, args) {
		try {
			const { body } = await snek.get(`https://registry.npmjs.com/${args.o}`);
			const version = body.versions[body['dist-tags'].latest];
			let deps = version.dependencies ? Object.keys(version.dependencies) : null;
			let maintainers = body.maintainers.map(user => user.name);
			let github = version.repository.url
			let gitshort = github.slice(23, -4)
			if (maintainers.length > 10) {
				const len = maintainers.length - 10;
				maintainers = maintainers.slice(0, 10);
				maintainers.push(`...${len} more.`);
			}
			if (deps && deps.length > 10) {
				const len = deps.length - 10;
				deps = deps.slice(0, 10);
				deps.push(`...${len} more.`);
			}
			function customTemplate() {
				return this.duration.asSeconds() >= 86400 ? "y [yıl] M [ay] d [gün]" : "h [saat] m [dakika] s [saniye]";
			}
			let updated = moment.duration(Date.now() - new Date(body.time[body['dist-tags'].latest]).getTime()).format(customTemplate, {
				trim: false
			})
			const embed = new RichEmbed()
				embed.setAuthor(`${body.name} | NPM Paket Bilgileri`, 'https://i.imgur.com/ErKf5Y0.png', `https://www.npmjs.com/package/${args.o}`)
				embed.addField(`• Açıklama:`, version.description || 'Açıklama Yok')
				embed.addField(`• Son Düzenleme:`, `${updated} önce (${moment(body.time[body['dist-tags'].latest]).format('DD/MM/YYYY')})`)
				embed.addField(`• Versiyon:`, body['dist-tags'].latest)
				embed.addField(`• Lisans:`, body.license)
				embed.addField(`• Sürdürenler:`, maintainers.join(', '))
				embed.addField(`• Bağımlılıklar:`, deps && deps.length ? deps.join(', ') : 'Bilinmiyor')
				embed.addField(`• GitHub Bağlantısı:`, `https://www.github.com/${gitshort}`)
				embed.setThumbnail('https://i.imgur.com/8DKwbhj.png')
				embed.setColor("RANDOM")
				embed.setTimestamp()
			msg.embed(embed)
		} catch (error) {
			if(error.status == 404) {
				const embed = new RichEmbed()
					embed.setTitle(`Herhangi bir sonuç bulunamadı!`)
					embed.setColor("RANDOM")
					embed.setTimestamp()
				msg.embed(embed)
			} else {
				console.log(error);
			}
		}
	}
};