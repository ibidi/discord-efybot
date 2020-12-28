const commando = require('discord.js-commando');
const Discord = require("discord.js")
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "seri-katil",
            group: 'eğlence',
            memberName: 'seri-katil',
            description: ' Bir kullanıcıyı öldürmek için seri katil tutarsınız.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

            args: [
                {
                    key: 'kullanici',
                    prompt: 'Kimin üzerine seri katil tutmamı istersin?\n',
                    type: 'member',
                    min: 1,
                    max: 1000
                },
                {
                    key: 'para',
                    prompt: 'Seri katil\'e ne kadar rüşvet vermek istiyorsun? Eğer vermek istemiyorsan "0" yazabilirsin\n',
                    type: 'integer'
                }
            ]
        });
    }

    async run(msg, args) {

        function get_random(list) {
            return list[Math.floor((Math.random() * list.length))];
        };

        var serikatilisabet = ["1", "2"];
        var sonuc = get_random(serikatilisabet);

        msg.react("🔪")
        msg.channel.send(`:knife: | **${msg.author.username}** tarafından seri katil ${args.kullanici} kişisine tutuldu.`)

        if (args.para === 0) {
            setTimeout(function(){ 
                msg.channel.send(`:knife: | Ah, ne yazık ki **${msg.author.username}** tarafından tutulan seri katil suçunu itiraf ederek kodese girmiş.`)
            }, 10000);
        } else {
            if (sonuc === "1") {
                setTimeout(function(){ 
                    msg.channel.send(`:knife: | Ah, ne yazık ki **${msg.author.username}** tarafından tutulan seri katil hedefe yaklaşırken kalp krizinden öldü.`)
                }, 10000);
            } else {
                setTimeout(function(){ 
                    let embed = new Discord.RichEmbed()
                    .setDescription(`**${args.kullanici}** seri katil tarafından öldürüldü.`)
                    .setColor(0xff0000)
                    .setImage("http://78.media.tumblr.com/a484e05b08dc44286f0fd023a7a54973/tumblr_ng9mwbO08v1titzlso1_500.gif")
                    .setFooter("Seri katil'i tutan kişi: " + msg.author.username)
                    return msg.channel.send(embed)
                }, 10000);
            }
        }
    }};
