const commando = require('discord.js-commando');
const Discord = require("discord.js")

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: ['pp'],
            group: 'bilgi',
            memberName: 'avatar',
            description: 'İstediğiniz kullanıcının avatarının linkini verir.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Kimin profil fotoğrafını görmek istersin?\n',
					type: 'member'
				}
			]
        });
    }

    async run(msg, args) {
	  const member = args.member;
		const user = member.user;
		const embed = new Discord.RichEmbed()
		.setColor(this.client.bilgiler.renk)
		.setImage(user.avatarURL)
	  return msg.channel.sendEmbed(embed)}};