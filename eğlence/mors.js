const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const morse = require('morse-node').create('ITU');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class MorseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mors',
	  aliases: ['morsalfabesi', 'morsa'],
      group: 'eğlence',
      memberName: 'mors',
      description: 'İstediğiniz bir yazıyı mors alfabesine çevirir.',
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      details: oneLine`
İstediğiniz Bİr Yazıyı Mors Alfabesine Çevirir.
			`,
      examples: ['morse merhaba'],
      args: [{
        key: 'toMorse',
        label: 'original',
        prompt: 'Neyi çevirmemi istersin?',
        type: 'string',
        infinite: false
      }]
    });
  }

  run(message, args) {
                                dbl.hasVoted(message.author.id).then(async voted => {
      if (voted) {
    const translated = morse.encode(args.toMorse);
    const embed = new RichEmbed()
      .setColor('#65cafe')
      .setTitle('Mors ALfabesi Çevirici')
      .addField('📥 Orjinal Hali 📥', args.toMorse, false)
      .addField('📤 Mors Alfabesine Çevirilmiş Hali 📤', translated, false)
      .setFooter(`Kullanan Kişi : ${this.client.user.username}`)
      .setTimestamp();
    message.delete(1);
    message.channel.send(message.author, { embed });
                                                              }  else {
    return message.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
  }
};