const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
// Start with the character '!'
const OFFSET = '!'.charCodeAt(0);
module.exports = class AsciiTextCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'ters-yazı',
      aliases: ["mesaj-döndür", "ters-yazdır"],
      group: 'eğlence',
      memberName: 'ters-yazı',
      description: 'Bot mesajlarınızı ters yazar.',
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      examples: ['ters-yazı sa == as'],
      args: [
		
        {
            key: 'mesaj',
            label: 'mesaj',
            prompt: 'Hangi yazıyı ters yazdırmak istiyorsun?',
            type: 'string'
        }
    ]
});
}

  //eslint-disable-next-line class-methods-use-this
  async run(message, args) {
      var msg = message
      msg.say(args.mesaj.split('').reverse().join(''));

  }
};