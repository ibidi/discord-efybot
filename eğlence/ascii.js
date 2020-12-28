const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const ascii = require('figlet');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);


module.exports = class AsciiTextCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ascii',
      aliases: ['asciit', 'texttoascii', 'textart', 'textasciiart'],
      group: 'eğlence',
      memberName: 'asciitext',
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      description: 'Yazınızı ascii yazı türüne çevirir.',
      details: oneLine`
        Ascii sanatını seviyormusun ?
        Bu komut mesajını ascii sanatına dönüştürür.
			`,
      examples: ['ascii merhaba'],
      args: [{
        key: 'toAscii',
        label: 'text',
        prompt: 'Ne yazmamı istersin?',
        type: 'string',
        validate: text => {
          if (text.length <= 10) return true;
          return 'En fazla 10 karakter.';
        },
        infinite: false
      }]
    });
  }

  run(message, args) {
            dbl.hasVoted(message.author.id).then(async voted => {
      if (voted) {
    ascii(args.toAscii, {
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted'
    },
    (err, data) => {
      if (err) {
        message.reply('Bir hata oluştu.  ');
        console.error(err);
      }
      message.delete(1);
      message.channel.send(data, {
        code: 'text'
      });
    });
              }  else {
    return message.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
  }
};
