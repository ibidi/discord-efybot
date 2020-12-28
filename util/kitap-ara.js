const stripIndents = require('common-tags').stripIndents;
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require("moment")
const request = require('node-superfetch')
require("moment-duration-format")
moment.locale('tr')
const { GOOGLE_KEY } = process.env
module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kitap-ara',
			aliases: ['kitapara'],
			group: 'util',
			memberName: 'kitap-ara',
			description: 'İstediğiniz bir kitap hakkında bilgi verir.',
			guildOnly: true,

			args: [
				{
					key: 'kitap',
					label: 'kitap',
					prompt: 'Hangi kitap hakkında bilgi almak istersin?',
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
    var message = msg
  const kitap = args.kitap

  try {
    const { body } = await request
      .get('https://www.googleapis.com/books/v1/volumes')
      .query({
        apiKey: GOOGLE_KEY,
        q: kitap,
        maxResults: 1,
        printType: 'books'
      });

    if(!body.items) {
      const embed = new Discord.RichEmbed()
        .setDescription(`Lütfen geçerli bir kitap ismi yazın.`)
        .setTimestamp()
        .setColor("RANDOM")
      message.channel.send({embed})
      return
    }
  
    const data = body.items[0].volumeInfo;

    const embed = new Discord.RichEmbed()
      .setAuthor(`${data.title} | Kitap Bilgileri`, "https://i.imgur.com/N3oHABo.png", `https://books.google.com.tr/`)
      .addField(`Yazarlar`, data.authors || 'Bilinmiyor')
      if(!data.publishedDate) {
        embed.addField(`Yayın Tarihi`, `Bilinmiyor`)
      } else {
        embed.addField(`Yayın Tarihi`, `${moment(data.publishedDate).format('DD/MM/YYYY')}`)
      }
      embed.addField(`Sayfa Sayısı`, data.pageCount || 'Bilinmiyor')
      if(data.imageLinks) {
        embed.setThumbnail(`${data.imageLinks ? data.imageLinks.thumbnail : null}`)
      }
      embed.setColor("RANDOM")
      .setTimestamp()
    message.channel.send({embed})
  } catch (err) {
    console.log(err)
  }
    }
};