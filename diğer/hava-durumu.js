const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const weather = require('weather-js');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hava-durumu',
			aliases: ['havadurumu'],
			group: 'diğer',
			memberName: 'hava-durumu',
			description: 'Bot ile hava durumuna bakabilirsiniz.',
			guildOnly: false,
			throttling: {
				usages: 2,
				duration: 3
            },
            args: [
                {
                    key: 'mesaj',
                    label: 'mesaj',
                    prompt: 'Nerenin hava durumunu öğrenmek istiyorsunuz?',
                    type: 'string'
                }
            ]
		});
	}

	async run(msg, args) {
        var message = msg
        weather.find({search: args.mesaj, degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);
            var current = result[0].current;
            var location = result[0].location;
            const embed = new Discord.RichEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`${current.observationpoint} için hava durumu`)
                .setThumbnail(current.imageUrl)
                .setColor(0x00AE86)
                .addField('Zaman Dilimi',`UTC${location.timezone}`, true)
                .addField('Derece Türü',location.degreetype, true)
                .addField('Sıcaklık',`${current.temperature} Derece`, true)
                .addField('Hava', `${current.feelslike}`, true)
                .addField('Rüzgar',current.winddisplay, true)
                .addField('Nem', `${current.humidity}%`, true)
                message.channel.send({embed});
        })
	}
};