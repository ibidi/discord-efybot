const commando = require('discord.js-commando');
const botConfig = require("../../_messages.json")
const Discord = require('discord.js');

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'afk',
            aliases: [],
            group: 'diğer',
            memberName: 'afk',
            description: 'Afk moduna geçmenizi sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 6
             },

			args: [
				{
					key: 'why',
					label: 'why',
					prompt: 'Neden AFK oluyorsunuz? Lütfen bir neden yazın.',
					type: 'string'
				}
			]
        });
    }

    async run(msg, args) {
		const why = args.why;
		const vt = this.client.provider.get(msg.author.id, 'afkStatus', []);
		const db = this.client.provider.get(msg.author.id, 'afkBefore', []);
		const db1 = this.client.provider.get(msg.author.id, 'afkGuild', []);
		if (vt !== "1") {
			if (msg.member.nickname !== null) {
				this.client.provider.set(msg.author.id, 'afkReason', why);
				this.client.provider.set(msg.author.id, 'afkBefore', msg.member.nickname);
				this.client.provider.set(msg.author.id, 'afkStatus', "1");
				this.client.provider.set(msg.author.id, 'afkGuild', msg.guild.id);
				msg.member.setNickname('[AFK] ' + msg.member.nickname + '');
				let embed = new Discord.RichEmbed()
					.setColor(this.client.bilgiler.renk)
					.setTitle("AFK")
					.setDescription(`**•** AFK moduna "$${why}" nedeni ile geçtiniz.`)
				return msg.channel.send(embed);
			} else {
				this.client.provider.set(msg.author.id, 'afkReason', why);
				this.client.provider.set(msg.author.id, 'afkBefore', msg.author.username);
				this.client.provider.set(msg.author.id, 'afkStatus', "1");
				this.client.provider.set(msg.author.id, 'afkGuild', msg.guild.id);
				msg.member.setNickname('[AFK] ' + msg.author.username + '');
				let embed = new Discord.RichEmbed()
					.setColor(this.client.bilgiler.renk)
					.setTitle("AFK")
					.setDescription(`**•** AFK moduna "${why}" nedeni ile geçtiniz.`)
				return msg.channel.send(embed);
			}
		} else {
			this.client.provider.set(msg.author.id, 'afkReason', "null");
			this.client.provider.set(msg.author.id, 'afkStatus', "0");
			this.client.provider.set(msg.author.id, 'afkGuild', "null");
			msg.member.setNickname(db);
			let embed = new Discord.RichEmbed()
				.setColor(this.client.bilgiler.renk)
				.setTitle("AFK")
				.setDescription("**•** Tekrardan hoş geldin")
			return msg.reply(embed);
		}
    }
};
