const { Command } = require('discord.js-commando');
const Discord = require('discord.js');


module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'davet-bilgi',
			group: 'sunucu',
			memberName: 'davet-bilgi',
			description: "Sunucunun davet linklerinin kaç kişi tarafından kullanıldığını gösterir.",
			guildOnly: false,
			guarded: false,
		});
	}

	async run(message, args) {
        let msg = message;
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send(`Davet bilgilerine bakman için gerekli yetkin bulunmuyor!`);
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`Davet eden kullanıcı: **${invites.inviter.username}** \nDavet ettiği kullanıcı sayısı:  **${invites.uses}**`)
    })

  var bilgi = "Davet edenler = Davet edilen kullanıcı sayısı"

   /* const embed = new Discord.RichEmbed()
        .setTitle(`Davet Listesi`)
        .setColor(this.client.bilgiler.renk)
    .setDescription(`${possibleinvites.join('\n\n')}`)
    .setThumbnail(message.guild.iconURL)
    message.channel.send(embed);*/

    const messages = [];
                try {
                    messages.push(await msg.embed({
                        title: 'Davet Listesi',
                        color: msg.guild ? msg.member.displayColor : 16711749,
                        thumbnail: {
                            url: message.guild.iconURL,
                        },
                        description: possibleinvites.join('\n\n')
                    }));
                } catch (err) {
                    messages.push(await msg.embed({
                        title: 'Hata',
                        color: msg.guild ? msg.member.displayColor : 16711749,
                        decription: 'Liste\'de davet linki bulunamıyor.',
                        thumbnail: {
                            url: message.guild.iconURL,
                        },
                    }, '', { reply: this.client.user }));
                }
                return messages;
}
}


