const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const hook = new Discord.WebhookClient("657884196852727810","osoZ2OWYM6ybA_GOQ_msygbfe2bLyh-xwwmAty6ESEb6mKNt0E7Eow5bcgKPemFfGNn4");

module.exports = class BugCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'bug',
			aliases: ['bug bildir', 'bugbuldum', 'bugbildir', 'eleştiri', 'hata', 'hata-bildir', 'hatabildir', 'eleştiriler'],
			group: 'bilgi',
			memberName: 'bug',
			description: 'Bottaki bugu bildirmenizi sağlar.',
			examples: ['bug <bulduğunuz bug>'],
			guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 120
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Bulduğun bugu yazar mısın?',
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
        .setDescription(`***(${msg.author.username})** adlı kullanıcının bulduğu hata:*`)
        .addField("- Kullanıcı bilgileri;", `• ID: ${msg.author.id}\n• Ad: ${msg.author.username}\n• Tag: ${msg.author.discriminator}`)
        .addField('- Bug;', `${args.msg}`)
        .setThumbnail(this.client.user.avatarURL);

        hook.send({ embeds: [embed] });
        
        msg.reply(`:ok_hand: Bug bildirildi! Bug bildirdiğiniz için teşekkür ederiz!`)
	}
};
