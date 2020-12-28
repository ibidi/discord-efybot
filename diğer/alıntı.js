const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'alıntı',
            group: 'diğer',
            memberName: 'alıntı',
            description: 'Belirttiğiniz mesajı alıntı yapar.',
            guildOnly: true,

            args: [
                {
                    key: 'id',
                    label: 'id',
                    prompt: 'Lütfen bu kanaldan bir mesajın idsini yazın.',
                    type: 'string',
                },
            ]
        });
    }

    async run(msg, args) {
        msg.channel.fetchMessage(args.id).then(message => 
            msg.say(`:writing_hand::skin-tone-1:  **•** "${message.content}" - *${message.author.tag}*`))      
    }};

/*
    async run(msg, args) {
        msg.channel.fetchMessage(args.id).then(msg) 
            const embed = new Discord.RichEmbed()
            .setColor("#7289DA")
            .setAuthor(msg.author.username, msg.author.displayAvatarURL)
            .addField("Mesaj", msg.content)
            .setFooter(`Alıntılayan Kişi: ${msg.author.tag}`, msg.author.avatarURL);
            msg.channel.send(embed)
        }
    }
*/