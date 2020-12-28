const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const Discord = require('discord.js');
var hook = new Discord.WebhookClient("657883435683282944", "97tEMEY-3X6bjAcwRKBHp8NyYIFAXM8ekC7yd3FwsiBh5bZAO1DodxwLcTsAzrKt2w09");

module.exports = class SuggestionCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tavsiye',
			aliases: ['tavsiye bildir', 'tavsiye ediyorum', 'tavsiyebildir', 'öneri', 'öneriler'],
			group: 'bilgi',
			memberName: 'tavsiye',
			description: 'Bota eklenmesini istediğiniz şeyi tavsiye etmenizi sağlar.',
			examples: ['tavsiye <istek>'],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 20
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Ne tavsiye ediyorsunuz?',
                    type: 'string',
                    min: 1,
                    max: 1000
                }
            ]
		});
	}

	async run(msg, args) {
		const embed =  new Discord.RichEmbed()
        .setColor(this.client.bilgiler.renk)
        .setDescription(`***(${msg.author.username})** adlı kullanıcının önerisi:*`)
        .addField("- Kullanıcı bilgileri;", `• ID: ${msg.author.id}\n• Ad: ${msg.author.username}\n• Tag: ${msg.author.discriminator}`)
        .addField('- Tavsiye;', `${args.msg}`)
        .setThumbnail(this.client.user.avatarURL);
        hook.send({ embeds: [embed] });
        msg.reply(`:ok_hand: Tavsiye bildirildi! Tavsiye bildirdiğiniz için teşekkür ederiz!`);
    }
};
