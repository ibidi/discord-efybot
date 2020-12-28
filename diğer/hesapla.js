const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const weather = require('weather-js');
const math = require('math-expression-evaluator')
module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hesapla',
			aliases: ['math'],
			group: 'diğer',
			memberName: 'hesapla',
			description: 'Bot ile matematik işlemleri yapabilirsiniz.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
            },
            args: [
                {
                    key: 'mesaj',
                    label: 'mesaj',
                    prompt: 'Bir işlem belirtin.\nÖrneğin: hesapla 2*6/10 (2 çarpı 6 bölü 10)',
                    type: 'string'
                }
            ]
		});
	}

	async run(msg, args) {
        var message = msg
        let cevap;
        try {
            cevap = math.eval(args.mesaj)
        } catch(err) {
            message.channel.send(`HATA: \n**${err ? err : "Bilinmiyor"}**`)
        }

        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField('» İşlem', args.mesaj ? args.mesaj : "İşlem Bulunamadı")
        .addField('» Sonuç', cevap ? cevap : "Hesaplanamadı")
        message.channel.send(embed)
    }
};