const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');

module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'discordbots',
			group: 'util',
			memberName: 'discordbots',
			description: "Yazdığınız botu Discord Bots üzerinden arar.",
			examples: ['botara'],
			guildOnly: false,
			guarded: false,
		args: [
				{
					key: 'q',
					label: 'bot',
					prompt: 'Lütfen aramak istediğiniz bot ismini yazın!',
					type: 'string',
					min: 1,
					max: 50
				}
			]
		});
	}

	async run(msg, args) {

		const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODE2MTkwNjEyMDc4NTk0OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc3MzA5NjE1fQ.xoeor7zL5rziKqeUNgAtX7sWWabOnirrPDE7VVVCOYA');

		dbl.getBots({search: args.q, limit: 5}).then(bots => {
			if(!bots.results[0]) {
				const embed = new RichEmbed()
					embed.setTitle(`Herhangi bir sonuç bulunamadı!`)
					embed.setColor("RANDOM")
					embed.setTimestamp()
					embed.setFooter(`2019 - ${this.client.user.username}`)
				msg.embed(embed)
				return;
			}
			const botum = bots.results[0]
			var sahip = '';
			if(!this.client.users.get(botum.owners[0])) {
				var sahip = botum.owners[0]
			} else {
				var sahip = this.client.users.get(botum.owners[0]).tag
			}
			const embed = new RichEmbed()
				embed.setColor("RANDOM")
				embed.setAuthor(`${botum.username} | Discord Bot Bilgileri`, "https://i.imgur.com/d9KjqZF.jpg", `https://discordbots.org/bot/${botum.id}`)
				embed.addField(`Bot Sahibi:`, sahip, true)
				embed.addField(`ID:`, botum.id, true)
				embed.addField(`Açıklama:`, botum.shortdesc, true)
				embed.addField(`Prefix:`, botum.prefix, true)
				embed.addField(`Kütüphane:`, botum.lib, true)
				embed.addField(`Upvote Sayısı:`, botum.points, true)
        embed.addField(`Aylık Upvote Sayısı`, botum.monthlyPoints || '0', true)
        embed.addField(`Sunucu Sayısı`, botum.server_count || '0', true)
        embed.addField(`Kurucu(lar)`,`<@${botum.owners.join('>\n<@')}>`,true)

				if(botum.certifiedBot === true) {
					embed.addField(`Sertifikalı mı?:`, 'Evet')
				}
				if(botum.certifiedBot === false) {
					embed.addField(`Sertifikalı mı?:`, 'Hayır')
				}
				if(botum.support) {
					embed.addField(`Bağlantılar:`, `[Davet Et](${botum.invite}) — [Destek Sunucusu](https://discord.gg/${botum.support}/) — [Web Sitesi](${botum.website}) — [GitHub](${botum.github})`)
				}
				embed.setThumbnail(`https://images.discordapp.net/avatars/${botum.id}/${botum.avatar}`)
				embed.setColor("#7289DA")
				embed.setTimestamp()
			msg.embed(embed)
		})
	}
};
