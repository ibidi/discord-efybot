const { Command } = require('discord.js-commando')
const commando = require('discord.js-commando');
const Discord = require('discord.js');;
const { stripIndents, oneLine } = require('common-tags');
const moment = require('moment-timezone');
const { disambiguation } = require('../../util/Util.js');
module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'yardım',
			group: 'bilgi',
			memberName: 'yardım',
			aliases: ['commands', 'y', 'komutlar', 'help', 'halp', 'h'],
			description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder.',
			details: oneLine`
					Yardım için herhangi bir komut adı belirtebilirsiniz.
					Bir komut belirtilmezse, mevcut tüm kullanılabilir komutlar listelenir.
			`,
			examples: ['yardım hepsi', 'yardım <komut>'],
			
			args: [
				{
					key: 'command',
					prompt: 'Hangi komut hakkında yardım istiyorsun?',
					type: 'string',
          default: ''
				}
			]
		});
	}

	async oldrun(msg, args) {
    const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
		const groups = this.client.registry.groups;
		const commands = this.client.registry.findCommands(args.command, false, msg);
		const showAll = args.command && args.command.toLowerCase() === 'hepsi';
		if(args.command && !showAll) {
			if(commands.length === 1) {
				let help = stripIndents`
					${oneLine`
						__Command **${commands[0].name}**:__ ${commands[0].description}
						${commands[0].guildOnly ? ' (Sadece sunucularda kullanılabilir)' : ''}
					`}

					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;
				if(commands[0].aliases.length > 0) help += `\n**Kısaltmalar:** ${commands[0].aliases.join(', ')}`;
				help += `\n${oneLine`
					**Group:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;
				if(commands[0].details) help += `\n**Detaylar:** ${commands[0].details}`;
				if(commands[0].examples) help += `\n**Örnekler:**\n${commands[0].examples.join('\n')}`;

				const messages = [];
				try {
					messages.push(await msg.direct(help));
					if(msg.channel.type !== 'dm') messages.push(await msg.reply('Özel mesajlarını kontrol et. :postbox:'));
				} catch(err) {
					messages.push(await msg.reply('Komutları özel mesaj olarak sana gönderemiyorum. Sanırım özel mesajların kapalı.'));
				}
				return messages;
			} else if(commands.length > 1) {
				return msg.reply(disambiguation(commands, 'commands'));
			} else {
				return msg.reply(
					`Geçersiz komut. ${msg.usage(
						null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
					)} komutunu kullanarak komut listesini görebilirsiniz.`
				);
			}
		} else {
			const messages = [];
			try {
				/** messages.push(await msg.direct(stripIndents`
					${oneLine`
						${msg.guild || 'Sunucu ismi bulunamadı!'} sunucusunda komut kullanmak için aşağıdaki örneği inceleyin.
						Örnek: ${Command.usage('komut', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
						Örnek: ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					`}
					Özel mesajda komut kullanırken, ön-ek (prefix) kullanmanıza gerek yok! Örnek: ${Command.usage('komut', null, null)}

					__**${showAll ? 'Tüm komutlar' : `${msg.guild + ' sunucusunda' || 'bu Özel Mesaj içinde'} kullanılabilir komutlar:`}**__

					${(showAll ? groups : groups.filter(grp => grp.commands.some(cmd => cmd.isUsable(msg))))
						.map(grp => stripIndents`
							__${grp.name}__
							${(showAll ? grp.commands : grp.commands.filter(cmd => cmd.isUsable(msg)))
								.map(cmd => `**${cmd.name}:** ${cmd.description}`).join('\n')
							}
						`).join('\n\n')
					}
				`, { split: true })); */
				
				const helpbed = new Discord.RichEmbed()
				.setColor(this.client.bilgiler.renk) // aqua
				.setTitle('Komut Listesi')
				.addBlankField()
				.setFooter(' ' + (new Date()).getFullYear() + ' EfyDev', this.client.user.avatarURL);
				
				groups.forEach(group =>
                    			helpbed.addField(`${prefix}!yardım **${group.name}**`,
                        			group.commands
                            				.map(command => `\`${command.name}\` - ${command.description}`)
                            					.join('\n')));
	
				messages.push(await msg.author.send({embed: helpbed}));
				
				if(msg.channel.type !== 'dm') {
					const dmbed = new Discord.RichEmbed()
					.setColor(this.client.bilgiler.renk)
					.setTitle('Özel mesajlarını kontrol et!')
					.setDescription('> Komutları özel mesaj olarak yolladım.');

					messages.push(await msg.channel.send({embed: dmbed}));
				}
			} catch(err) {
				const errbed = new Discord.RichEmbed()
				.setColor(this.client.bilgiler.renk)
				.setTitle('Hata!')
				.setDescription('Komutları özel mesaj olarak sana gönderemiyorum. Sanırım özel mesajların kapalı.');

				messages.push(await msg.channel.send({embed: errbed}));
			}
			return messages;
		}
	}

	async run(msg, args) {
    const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
		let group;
    const emb3 = new Discord.RichEmbed()
    .setTitle('Müzik Komutları')
    .setDescription(`[!çal](https://discord.gg/rHnySnr): Belirtilen adres veya arama için bir müzik çalar\n[!çalan](https://discord.gg/rHnySnr): Şu anda yürütülen şarkıyı görüntüler.\n[!devam-et](https://discord.gg/rHnySnr): Duraklatılan şarkıyı devam ettirir.\n[!duraklat](https://discord.gg/rHnySnr): Çalan şarkıyı duraklatır.\n[!durdur](https://discord.gg/rHnySnr): Çalan şarkıyı durdurur ve bot odadan çıkış yapar.\n[!geç](https://discord.gg/rHnySnr): Çalan şarkıyı geçer.\n[!kuyruk](https://discord.gg/rHnySnr): Kuyrukta olan şarkıları gösterir.\n[!ses](https://discord.gg/rHnySnr): Çalan şarkının sesini ayarlar.\n[!tekrar](https://discord.gg/rHnySnr): Çalan şarkıyı tekrarlar.`)
    .setColor(this.client.bilgiler.renk)// 0xf4a460
    .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL);
    const emb4 = new Discord.RichEmbed()
    .setTitle('Gelişmiş Oda Sistemi')
    .setDescription(`\`Gelişmiş özel oda\` sistemini sunucunuzda kullanabilmek için;
**1-** \`💳 Özel Oda\` adında bir sesli oda kurmalısınız. 
**2-** \`gruplar\` adında bir kategori kurmalısınız. ( Eğer kategori oluşturmazsanız oda boş olarak oluşur ve sizi taşımaz. )
**3-** Bu ayarları yaptıktan sonra sistem otomatik olarak çalışmaya başlayacaktır.`)
    .setColor(this.client.bilgiler.renk)// 0xf4a460
    .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL);
    
        const ss3 = args.command;
        var groups = this.client.registry.groups.map(g => g.id);
        const emb = new Discord.RichEmbed()
        .setAuthor('EfyBot — Komut Grupları', this.client.user.avatarURL)
        .setDescription(this.client.registry.groups.map(c=> `[${prefix}yardım ${c.id}](https://discord.gg/rHnySnr) - ${c.name}`))
        //.addField('', this.client.registry.groups.map(c=> `[!yardım](efyb.xyz) ${c.id} - **${c.name}**`))
        .setColor(this.client.bilgiler.renk)// 0xf4a460
        .setFooter(`Örnek kullanım: !yardım ayarlar`)
        .setThumbnail(this.client.user.avatarURL)
        if (!args.command) return msg.embed(emb);
        if(args.command === "müzik") return msg.channel.send(emb3)
        if(args.command === "oda") return msg.channel.send(emb4)
        if (!groups.some(g => args.command == g)) return msg.channel.send(`${msg.member.toString()}, lütfen doğru komut grubundan yardım alınız.`, {embed: emb})
        if (this.client.registry.groups.has(args.command)) group = this.client.registry.groups.get(args.command);

        
        const helpbed = new Discord.RichEmbed()
        .setTitle(group.name)
        .setDescription(`
        ${group.commands.map(g => `[${prefix}${g.name}](https://discord.gg/rHnySnr): ${g.description}`).join("\n")}
                `)
        .setColor(this.client.bilgiler.renk)// 0xf4a460
        .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
        msg.embed(helpbed)
	}
};
