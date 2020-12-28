const Discord = require('discord.js');
const commando = require('discord.js-commando');

module.exports = class EvalCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ibd',
			group: 'admin',
			memberName: 'ibd',
			description: 'Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.',
			args: [
				{
					key: 'title',
					prompt: 'Başlık kısmına ne yazmak istiyorsun?',
					type: 'string'
				},
        {
          key: 'description',
					prompt: 'Açıklama kısmına ne yazmak istiyorsun?',
					type: 'string'
        }
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(message, args) {
      let mesaj = args.title;
    let aciklama = args.description;
  message.delete();
    const embed = new Discord.RichEmbed()
    .setTitle(`${mesaj}`)
    .setDescription(`${aciklama}`)
    .setColor(this.client.bilgiler.renk)
  message.channel.send(embed);
};
}