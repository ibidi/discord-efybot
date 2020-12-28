const { Command } = require('discord.js-commando');

module.exports = class PreEnableCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'özel-sunucu-deaktif',
			aliases: ['premiumdeaktif'],
			group: 'admin',
			memberName: 'özel-sunucu-deaktif',
			description: 'Bot geliştiricileri tarafından özelleştirmiş bir sunucunun özelleştirmesini kapatır.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'guild',
					label: 'sunucu',
					prompt: "Özelleştirmeyi kapatmak istediğiniz sunucunun ID'sini yazınız.\n",
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
	    const sunucu = args.guild;
	    if (this.client.guilds.has(sunucu)) {
    		const sunucuAdi = await this.client.guilds.get(sunucu).name;
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send('Bu sunucu zaten özelleştirilmiş değil.');
    		var mesaj = await msg.channel.send('Özelleştirme kapatılıyor...');
    		this.client.provider.set(sunucu, 'preEnabled', false);
    		return mesaj.edit('Özelleştirme başarıyla kapatıldı.')
    	} else {
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send('Bu sunucu zaten özelleştirilmiş değil.');
    	    var mesaj = await msg.channel.send('EfyBot bu sunucudan atılmış, özelleştirme kapatılıyor...');
    	    this.client.provider.set(sunucu, 'preEnabled', false);
    	    mesaj.edit('Özelleştirme başarıyla kapatıldı.');
    	}
	}
};