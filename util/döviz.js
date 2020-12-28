const commando = require('discord.js-commando');
const Discord = require('discord.js');
const TCMB_Doviz = require('tcmb-doviz');
const Doviz = new TCMB_Doviz();

module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'döviz',
			aliases: [],
			group: 'util',
			memberName: 'döviz',
			description: 'İstediğiniz bir kitap hakkında bilgi verir.',
			guildOnly: true,
		});
	}

	async run(message, args) {
     {
        const res = await Doviz.getKur("USD");
        const eur = await Doviz.getKur("EUR");
        const gbp = await Doviz.getKur("GBP");
        const jpy = await Doviz.getKur("JPY");
        const tarih = await Doviz.guncelTarih();
        let embed = new Discord.RichEmbed();
        embed.setAuthor(`Döviz Kurları`);
        embed.setColor(this.client.bilgiler.renk);
        embed.setDescription(`:dollar: 1 Dolar: ${res.satis} TL\n:euro: 1 Euro: ${eur.satis} TL\n:pound: 1 İngiliz Sterlini: ${gbp.satis} TL\n:yen: 1 Yen: ${jpy.satis} TL`)
        embed.setFooter(`Güncellenme tarihi: ${tarih}`)
        message.channel.send({embed: embed});
    }

}
}