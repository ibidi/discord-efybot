const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');

module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'steam-ara',
			group: 'util',
			memberName: 'steam-ara',
			description: "Steam üzerinden oyun aramanızı sağlar.",
			examples: ['steam'],
			guildOnly: false,
			guarded: false,
      			credit: [
				{
					name: 'Steam',
					url: 'https://store.steampowered.com/'
				}
			],
		args: [
				{
					key: 'query',
					prompt: 'Steam mağazası üzerinden hangi oyunu aramak istiyorsunuz?\n',
					type: 'string',
					min: 1,
					max: 50
				}
			]
		});
	}

	async run(msg, { query }) {
		try {
			const id = await this.search(query);
			if (!id) return msg.say('Hiçbir sonuca ulaşamadım.');
			const data = await this.fetchGame(id);
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Ücretsiz';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Ücretsiz';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}
			const embed = new RichEmbed()
				embed.setColor('0x36393F')
				embed.setAuthor('Steam Mağaza', 'https://cdn.discordapp.com/emojis/641704118985031681.png?v=1', 'http://store.steampowered.com/')
				embed.setTitle(data.name)
				embed.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				embed.setThumbnail(data.header_image)
				embed.addField('• Fiyatı', price)
				embed.addField('• Metacritic Puanı', data.metacritic ? data.metacritic.score : '???')
				embed.addField('• Platformlar', platforms.join(', ') || 'None')
				embed.addField('• Çıkış Tarihi', data.release_date ? data.release_date.date : '???')
        embed.addField('• Öneriler', data.recommendations ? data.recommendations.total : '???')
				embed.addField('• Geliştiricileri', data.developers ? data.developers.join(', ') || '???' : '???')
      	embed.addField('• Yayınlayanlar', data.publishers ? data.publishers.join(', ') || '???' : '???');
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh, bir sorunla karşılaştık \`${err.message}\`. Lütfen daha sonra tekrar deneyin!`);
		}
	}

	async search(query) {
		const { body } = await request
			.get('https://store.steampowered.com/api/storesearch')
			.query({
				cc: 'tr',
				l: 'tr',
				term: query
			});
		if (!body.items.length) return null;
		return body.items[0].id;
	}

	async fetchGame(id) {
		const { body } = await request
			.get('https://store.steampowered.com/api/appdetails')
			.query({ appids: id });
		return body[id.toString()].data;
	}
};
