const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class PreEnableCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'özel-sunucu-aktif',
            aliases: ['pre-a', 'pre-aktif'],
            group: 'admin',
            memberName: 'premium-aktif',
            description: 'Bot geliştiricileri tarafından istenilen bir sunucu özelleştirilir ve daha gelişmiş komutları kullanmayı sağlar.',
            throttling: {
                usages: 2,
                duration: 3
            },

            args: [
                {
                    key: 'guild',
                    label: 'sunucu',
                    prompt: "Özelleştirmek istediğiniz sunucunun ID'si nedir?",
                    type: 'string'
                },
                {
					key: 'kullanici',
					label: 'kullanici',
					prompt: 'Kimin için sunucu özelleştiriyorsunuz?',
					type: 'user'
                },
                {
					key: 'tarih',
					label: 'tarih',
					prompt: 'Özelleştirme ne zamana kadar geçerli olacak?',
					type: 'string'
                },
                {
					key: 'aciklama',
					label: 'aciklama',
					prompt: 'Eklemek istediğiniz bir not?',
					type: 'string'
                }
            ]
        });
    }

    hasPermission(msg) {
        return this.client.isOwner(msg.author);
    }

    async run(msg, args) {
        const tarih = args.tarih;
        const kullanici = args.kullanici;
        const sunucu = args.guild;
        const aciklama = args.aciklama;
		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
		if (preEnabled == true) return msg.channel.send('Bu sunucu zaten özel bir sunucu.');
        this.client.provider.set(sunucu, 'preEnabled', true);

                var embed = new Discord.RichEmbed()
				.setColor(3066993)
        .setAuthor(sunucu.name, sunucu.iconURL)
				.setDescription(`**Özelleştirme detayları**`)
				.setThumbnail(this.client.user.avatarURL)
				.addField(`Sunucu ID:`, `${sunucu}`)
				.addField(`Sunucu Sahibi / Ekleyen:`, `${kullanici.tag}`)
        .addField('Bitiş tarihi:', `${tarih}`)
        .addField('Not: ', `${aciklama}`)
				.setTimestamp();
        
        this.client.channels.get('668945691992653835').send({embed});

        return msg.channel.send(`Başarıyla ${sunucu} ID'li sunucuda ${kullanici} için "${tarih}" tarihinde alınmak üzere özelleştirildi.`);
		
    }
};