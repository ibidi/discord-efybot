const { Command } = require('discord.js-commando');
const Discord = require("discord.js")
const bot = new Discord.Client()

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anımsatıcı',
			group: 'diğer',
			memberName: 'anımsatıcı',
			description: 'Anımsatıcı kurmanızı sağlar.',
			throttling: {
				usages: 2,
				duration: 30
			},

			args: [
				{
					key: 'message',
					prompt: 'Neyi anımsatmamı istersin? Lütfen yazınız.',
					type: 'string',
				},
				{
					key: 'second',
					prompt: 'Kaç saniye sonra sana anımsatmamı istersin?',
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
	
	msg.channel.send(":ok_hand: Tamamdır! " + + args.second + " saniye sonra direkt mesaj yoluyla anımsatacağım.")

	let second = args.second + "000"

	let embed = new Discord.RichEmbed()

		.setTitle("Anımsatıcı")
		.setDescription("\""+ args.message +"\"")
		.setFooter(`Bu mesajı sana ${args.second} saniye sonra anımsattım.`)
		.setColor("RANDOM")

		setTimeout(function() {
			msg.author.send(embed) 
		},  second);
	}}