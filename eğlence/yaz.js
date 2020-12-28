const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { RichEmbed } = require('discord.js');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'yazdır',
      group: 'eğlence',
      memberName: 'yazdır',
          				aliases: ['yaz-dır','yaz'],
      description: 'Bota yazı yazdırırsınız.',
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      details: oneLine`
Bota yazı yazdırırsınız.
			`,
      examples: ['yazdır sa'],
      args: [{
        key: 'toEcho',
        label: 'echo',
        prompt: 'Ne yazmamı istersin ?',
        type: 'string',
        infinite: false
      }]
    });
  }

  async run(message, args) {
    const avatarURL = message.author.avatar ? message.author.avatarURL : 'https://discordapp.com/assets/0e291f67c9274a1abdddeb3fd919cbaa.png';
    const embed = new RichEmbed()
      .setAuthor(`${message.author.tag}`, `${avatarURL}`)
      .setColor(0x0000FF)
      .setDescription(`${args.toEcho}`)
      .setFooter(`Yazdıran Kişi: ${message.author.username}`)
      .setTimestamp();
    message.delete(1);
    await message.channel.send({
      embed
    });
  }
};