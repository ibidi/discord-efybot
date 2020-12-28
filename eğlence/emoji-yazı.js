const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTczOTI0MjI3fQ.Kv7sX4hPoBFpkte6x7mJwqaVR29XkExUYrUxAw_HKRM', this.client);
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:',
    'ğ': ':regional_indicator_g:',
    'ı': ':regional_indicator_i:',
    'ş': ':regional_indicator_s:',
    'ç': ':regional_indicator_c:',
    'ö': ':regional_indicator_o:',
    'ü': ':regional_indicator_u:',
    'Ğ': ':regional_indicator_g:',
    'İ': ':regional_indicator_i:',
    'Ş': ':regional_indicator_s:',
    'Ç': ':regional_indicator_c:',
    'Ü': ':regional_indicator_u:',
    'Ö': ':regional_indicator_o:'
  };
  
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
  });
module.exports = class AsciiTextCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'emoji-yazı',
      aliases: [],
      group: 'eğlence',
      memberName: 'emoji-yazı',
      description: 'Emoji şeklinde yazı yazarsınız.',
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      examples: ['emoji-yazı sa'],
      args: [
		
        {
            key: 'mesaj',
            label: 'mesaj',
            prompt: 'Emoji şeklinde hangi yazıyı yazıcaksınız?',
            type: 'string'
        }
    ]
});
}

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
                dbl.hasVoted(message.author.id).then(async voted => {
      if (voted) {
    message.channel.send(
        args.mesaj
            .split('')
            .map(c => mapping[c] || c)
            .join('')
    );
                                              }  else {
    return message.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
  }
};