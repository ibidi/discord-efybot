const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kapat',
            group: 'diğer',
            memberName: 'kapat',
            description: 'Bulunduğunuz sunucunun davet linkini verir.',
            throttling: {
                usages: 1,
                duration: 5
            },
        });
    }

async run(message) {
    if (message.content.toLowerCase().startsWith(`${message.guild.commandPrefix}` + `kapat`)) {
        if (!message.channel.name.startsWith(`destek-`)) return message.channel.send(`Bu komut sadece Destek Talebi kanallarında kullanılabilir.`);
      
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`Destek Talebi Kapatma İşlemi`)
        .setDescription(`Destek talebini kapatmayı onaylamak için, \n10 saniye içinde \`evet\` yazınız.`)
        .setFooter(`${this.client.user.username} | Destek Sistemi`)
        .setTimestamp()
        message.channel.send({embed})
        .then((m) => {
          message.channel.awaitMessages(response => response.content === 'evet', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              message.channel.delete();
            })
            .catch(() => {
              m.edit('Destek talebi kapatma isteği zaman aşımına uğradı.').then(m2 => {
                  m2.delete();
              }, 3000);
            });
        });
        }
    }
}