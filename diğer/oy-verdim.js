const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const ms = require('parse-ms');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'oy-verdim',
			group: 'bilgi',
      			aliases: ['oyverdim','oy-ver','oyver'],
			memberName: 'oy-verdim',
			description: 'Eğer destek sunucumuzda varsanız birde dbl üzerinden oy verdiyseniz size "Destekçiler" adında rol verir.',
			examples: [],
			guildOnly: true,
			guarded: true,
		});
	}

	async run(message, args) { 
   if(message.guild.id !== '639742703998992405') return message.channel.send(this.client.bilgiler.hayır+' Bu sistem sadece **Efy** sunucusuna aittir. Oy verdikten sonra rolünüzü almak için destek sunucuma gelebilirsiniz. -- https://discord.gg/rHnySnr')
 
    if(message.member.roles.has('657908967468564480') === true) return message.channel.send(this.client.bilgiler.hayır+` Bota zaten oy vermişsin, üzgünüm daha fazla **Destekçiler** rolü veremem.`)

 
    

     const snekfetch = require("snekfetch");
snekfetch.get(`https://discordbots.org/api/bots/635442486084501534/check?userId=${message.author.id}`)
.set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k")
.then(response => {
var check = response.body.voted;
if (check == 1) {
    
  

  message.channel.send('Başarılı, **Destekçiler** rolünü başarılı bir şekilde verdim. Bota **12** saat sonra bota tekrardan oy verebilirsin. **Destekçiler** rolü hafta başlarında (yöneticiler ve moderatörler) tarafından sıfırlanmaktadır.')

  message.member.addRole('657908967468564480')
    } else {
      message.channel.send(this.client.bilgiler.hayır+` Üzgünüm, **Destekçiler** rolünü alabilmek için https://discordbots.org/bot/635442486084501534/vote adresinden bota oy vermeniz gerekmektedir. Vermiş olduğunuz oy bir kaç dakika sonra sisteme düşmektedir, lütfen bekleyin. `)
      return }});
};
}