const { Command } = require('discord.js-commando');
const Discord = require("discord.js")
const bot = new Discord.Client()

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'çekiliş',
			group: 'util',
			memberName: 'çekiliş',
			description: 'Sunucuda çekiliş yapılmasını sağlarsınız.',
			throttling: {
				usages: 2,
				duration: 30
			},

			args: [
				{
					key: 'başlık',
					prompt: 'Çekiliş başlığı ne olmasını istersiniz?',
					type: 'string',
				},
				{
					key: 'saniye',
					prompt: 'Kaç saniye sonra bitmesini istersin? ',
					type: 'integer',
				},
				{
					key: 'kanal',
					prompt: 'Hangi kanala gönderilmesini istersiniz?',
					type: 'channel'
				}
			]
		});
	}

	hasPermission(message) {
		return this.client.isOwner(message.author) || message.member.hasPermission("ADMINISTRATOR")
	}

    async run(msg, args) {

		msg.say(`:ok_hand: Tamamdır, **${args.başlık}** çekilişi <#${args.kanal.id}> kanalında başladı! :tada:`)
		let second = args.saniye + "000"
	   	let id;
		let embed = new Discord.RichEmbed()
	
			.setTitle(args.başlık)
			.setDescription(`Çekilişe katılmak için 🎉 emojisine tıklayın.`)
			.setColor("RANDOM")
			.setFooter(args.saniye + " saniye sonra çekiliş bitecektir.")
		this.client.guilds.get(msg.guild.id).channels.get(args.kanal.id).send(embed)
			.then(mesg => {
				id = mesg.id;
				mesg.react("🎉")
				console.log("Başlatılan çekiliş: " + mesg.id)
			})
	
		setTimeout(async => {
			args.kanal.fetchMessage(id).then(m => {
			let kazanan = m.reactions.find(c => c.emoji.toString()==='🎉').users.filter(c=>{ 
			!c.bot 
			return !msg.author
			}).random()
			let embed2 = new Discord.RichEmbed()
			.setTitle(args.başlık)
			.setDescription(`Kazanan ${kazanan}`)
			.setColor("RANDOM")
			.setFooter("Çekiliş bitti.")
			.setTimestamp();  m.edit(embed2)
			this.client.guilds.get(msg.guild.id).channels.get(args.kanal.id).send(`Tebrikler! **${args.başlık}** çekilişini ${kazanan} kazandı!`)});
		},  second)}}