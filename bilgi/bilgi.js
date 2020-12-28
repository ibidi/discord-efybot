const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bilgi',
			group: 'bilgi',
			memberName: 'bilgi',
      				aliases: ['davet','yapımcılar','sürüm','web-site','destek','blog'],
			description: 'Bot hakkında bilgiler verir.',
			examples: [],
			guildOnly: true,
			guarded: true,
		});
	}

	async run(msg, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
    //.addField(":tools: Geliştirici:", `**${this.client.users.get("407455869643784192").tag}**`,true)
    .setDescription(`EfyBot, Moderatör görevi yapabilen, sizi eğlence komutlarıyla eğlendirebilen bir Türkçe Discord Botudur. Bunu yanı sıra kendine özgün apileri ile kullanıcılara tam destek sunar. Botu sunucunuza ekledikten sonra efy!sunucu-ayarları komutunu kullanarak sunucunuz için gerekli olan ayarları yapabilirsiniz.`)
    .addField("Botu davet et", `[Buraya tıkla](https://discord.com/oauth2/authorize?client_id=742507883110858824&permissions=2146958591&scope=bot)`, true)
    .addField("Destek sunucusu", `[Buraya tıkla](https://discord.gg/ZXfgWA4gR8)`, true)
    .addField("Oy ver","[Buraya tıkla!](https://top.gg/bot/635442486084501534/vote)", true)
    .addField("Geliştirici", `Bu bot **${this.client.users.get("725410917319311360").tag}** tarafından geliştirilmektedir. [Buraya tıklayarak](http://ibidi.dev/) ibidi'nin kişisel web sayfasına gidebilirsiniz.`)
    .setColor(this.client.bilgiler.renk)
	return msg.embed(embed);
  
}
}