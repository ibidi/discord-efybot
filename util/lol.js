  const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const request = require('node-superfetch');
const buttons = ['Q', 'W', 'E', 'R'];

module.exports = class LeagueOfLegendsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'lol-bilgi',
			aliases: ['league-of-legends-champion', 'league-of-legends-champ', 'league-champ', 'lol-champ'],
			group: 'util',
			memberName: 'lol-bilgi',
			description: "LoL'deki istediğiniz bir şampiyon hakkında bilgi verir. **YENI**",
			credit: [
				{
					name: 'Riot Games API',
					url: 'https://developer.riotgames.com/'
				}
			],
			args: [
				{
					key: 'champion',
					prompt: 'Hangi şampiyon hakkında bilgi edinmek istersin?',
					type: 'string',
					parse: champion => champion.toLowerCase()
				}
			]
		});

		this.version = null;
		this.champions = null;
	}

	async run(msg, args) {
    const champion = args.champion;
		if (champion === 'satan') champion = 'teemo';
		try {
			if (!this.version) await this.fetchVersion();
			const data = await this.fetchChampion(champion);
			if (!data) return msg.say('Şampiyon bulunamadı veya eklenmemiş.');
			const tips = [].concat(data.allytips, data.enemytips);
			const embed = new Discord.RichEmbed()
				.setColor(0x002366)
				.setAuthor('League of Legends', 'http://www.macupdate.com/images/icons256/47210.png', 'https://leagueoflegends.com/')
				.setTitle(`${data.name} ${data.title}`)
				.setDescription(data.blurb)
				.setThumbnail(`https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${data.image.full}`)
				.addField('❯ Saldırı', data.info.attack, true)
				.addField('❯ Savunma', data.info.defense, true)
				.addField('❯ Büyü', data.info.magic, true)
				.addField('❯ Zorluk', data.info.difficulty, true)
				.addField('❯ Can', `${data.stats.hp} (${data.stats.hpperlevel}/level)`, true)
				.addField('❯ Can yenilemesi', `${data.stats.hpregen} (${data.stats.hpregenperlevel}/level)`, true)
				.addField('❯ Mana', `${data.stats.mp} (${data.stats.mpperlevel}/level)`, true)
				.addField('❯ Mana yenilemesi', `${data.stats.mpregen} (${data.stats.mpregenperlevel}/level)`, true)
				.addField('❯ Kaynak', data.partype, true)
				.addField('❯ Zırh', `${data.stats.armor} (${data.stats.armorperlevel}/level)`, true)
				.addField('❯ Saldırı gücü', `${data.stats.attackdamage} (${data.stats.attackdamageperlevel}/level)`, true)
				.addField('❯ Saldırı alanı', data.stats.attackrange, true)
				.addField('❯ Saldırı hızı değeri', `${data.stats.attackspeed} (${data.stats.attackspeedperlevel}/level)`, true)
				.addField('❯ Kritik', `${data.stats.crit} (${data.stats.critperlevel}/level)`, true)
				.addField('❯ Yürüyüş hızı', data.stats.movespeed, true)
				.addField('❯ Büyü bloğu', `${data.stats.spellblock} (${data.stats.spellblockperlevel}/level)`, true)
				.addField('❯ Pasif', data.passive.name, true)
				.addField('❯ Yetenekler', data.spells.map((spell, i) => `${spell.name} (${buttons[i]})`).join('\n'), true)
        .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
			return msg.say(`Bilgi: ${tips[Math.floor(Math.random() * tips.length)]}`, { embed });
		} catch (err) {
			return msg.reply(`Hata: \`${err.message}\`. Lütfen tekrar deneyin!`);
		}
	}

	async fetchVersion() {
		const { body } = await request.get('https://ddragon.leagueoflegends.com/api/versions.json');
		[this.version] = body;
		setTimeout(() => { this.version = null; }, 3.6e+6);
		return body;
	}

	async fetchChampions() {
		if (this.champions && this.champions.version === this.version) return this.champions;
		const { body } = await request
			.get(`https://ddragon.leagueoflegends.com/cdn/${this.version}/data/tr_TR/champion.json`);
		this.champions = body;
		return body;
	}

	async fetchChampion(champion) {
		const champions = await this.fetchChampions();
		const name = Object.keys(champions.data).find(key => key.toLowerCase() === champion);
		if (!name) return null;
		const { id } = champions.data[name];
		const { body } = await request
			.get(`https://ddragon.leagueoflegends.com/cdn/${this.version}/data/tr_TR/champion/${id}.json`);
		return body.data[id];
	}
};