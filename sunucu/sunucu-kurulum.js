const commando = require('discord.js-commando');
const Discord = require('discord.js');
const {stripIndents} = require('common-tags');

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sunucu-kurulum',
            group: 'sunucu',
            memberName: 'sunucu-kurulum',
            description: 'Bot sunucunuzu baştan aşağıya doğru yeniden kurar. **YENI**',
            guildOnly: true,
        });
    }
     hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

    async run(message, args) {  
try {
	const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onaylıyor musunuz?')
	.setFooter('Komut kullanmadan kanala direk "evet" yazar iseniz onaylamış olursunuz. Hiç bir şey yazmaz iseniz onaylanmaz.')
	message.channel.send({embed: embed})
	 message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.guild.channels.forEach((kanal) => {
          	kanal.delete()
          })
           setTimeout(() => {
          message.guild.roles.forEach((rol) => {
          	rol.delete()
          })
      }, 5000)
     
     const embedd = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsinin silinip botun yeni bir sunucu kurmasını onayladınız! Sunucu kuruluyor bu işlem biraz zaman alabilir.')
	message.author.send({embed: embedd})

    let every = message.guild.roles.find(r => r.name === '@everyone')

    //Kategoriler
    message.guild.createChannel('Bilgilendirme', 'category').then(bilgi => {
    message.guild.createChannel('Toplum', 'category').then(toplum => {
    message.guild.createChannel('Kayıtlar', 'category').then(kayitlar => {
    message.guild.createChannel('Sesli Kanallar', 'category').then(sesli => {

    //Kanallar
    setTimeout(() => {
    	message.guild.createChannel('kurallar', 'text').then(kurallar => {
    	kurallar.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    	kurallar.setParent(bilgi.id)
    	kurallar.send(stripIndents`
    	\`\`\`md
> Kurallar
1. Küfür etmek, hakaretlerde bulunmak yasaktır!
2. Reklam yapmak, link atmak sunucu içersin de de, sunucudaki bir üyeye özelden mesaj olarakta kesinlikle yasaktır!
3. #komutlar kanalı dışında bir kanalda komut kullanmak yasaktır!
4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!
5. Din, dil, ırk ayrımı yapmak yasaktır!
6. Siyaset hakkında tartışmak, konuşmak yasaktır!
7. Spam ve flood yapmak yasaktır!
8. Uygunsuz davranışlarda bulunmak, uygunsuz paylaşımlar yapmak yasaktır!
- Kuralları okumamak kesinlikle yasaktır!
\`\`\`
    	`)
    	kurallar.send(stripIndents`
    		\`\`\`md
[NOT]: Sunucudaki her üye *yetkili dahil* kuralları okumuş olarak kabul edilir. Buradaki maddelere herhangi bir karşı gelme olayı olduğu an "bilmiyordum, okumamıştım" gibi bahanelerin *hiç biri* umursanmaz ve gerekli işlem yapılır!
\`\`\`
    	`)
      kurallar.send(stripIndents`
    		\`\`\`md
[EKSTRA NOT]: Gelişmiş sunucu kurulum komutu kullanmış olduğunuz için sizleri de destek sunucuma bekliyorum. Burada bot hakkında destek alabilirsiniz.\n - Giriş anahtarı: https://discord.gg/rHnySnr
\`\`\`
    	`)
    })
    	message.guild.createChannel('duyurular', 'text').then(duyurular => {
    	duyurular.overwritePermissions(every, {
    		SEND_MESSAGES: false
    	})
    	duyurular.setParent(bilgi.id)
    })
    	message.guild.createChannel('sohbet', 'text').then(sohbet => {
    	sohbet.setParent(toplum.id)
    })
    	message.guild.createChannel('komut-kullanım', 'text').then(komutlar => {
    	komutlar.setParent(toplum.id)
    })

    setTimeout(() => {
    	message.guild.createChannel('gelen-giden', 'text').then(gc => {
    	gc.setParent(kayitlar.id)
    })
    	message.guild.createChannel('moderasyon-kayıtları', 'text').then(modlog => {
    	modlog.setParent(kayitlar.id)
    })
    	message.guild.createChannel('sunucu-kayıtları', 'text').then(log => {
    	log.setParent(kayitlar.id)
    })
    }, 10000)

    setTimeout(() => {
    	message.guild.createChannel('Sohbet Odası', 'voice').then(shbt => {
    	shbt.setParent(sesli.id)
    })
    	message.guild.createChannel('Sohbet Odası - 2', 'voice').then(shbt2 => {
    	shbt2.setParent(sesli.id)
    })
    	message.guild.createChannel('Oyun Odası', 'voice').then(oyn => {
    	oyn.setParent(sesli.id)
    })
    	message.guild.createChannel('Oyun Odası - 2', 'voice').then(oyn2 => {
    	oyn2.setParent(sesli.id)
    })
    	message.guild.createChannel('Müzik Odası', 'voice').then(mzk => {
    	mzk.setParent(sesli.id)
    })
    	message.guild.createChannel('Müzik Odası - 2', 'voice').then(mzk2 => {
    	mzk2.setParent(sesli.id)
    })
    }, 15000)

    })})})})
      
    setTimeout(() => {
    	message.guild.createRole({
        name: 'Kurucu',
        color: 'ff0000',
        permissions: [
            "ADMINISTRATOR",
    ]
      })
      message.guild.createRole({
        name: 'Yönetim',
        color: '00bdff',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })
      message.guild.createRole({
        name: 'Moderator',
        color: '00ff08',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })
      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffb6',
      })
      message.guild.createRole({
        name: 'Bot',
        color: 'ff8100',
      })
      message.guild.createRole({
        name: 'Üye',
        color: 'caf7fc',
      })

    const embed = new Discord.RichEmbed()
	.setColor('RANDOM')
	.setDescription('Sunucunuzdaki kanalların, kategorilerin ve rollerin hepsi başarıyla silindi! Ve sunucu kurulumu tamamlandı!')
	message.author.send({embed: embed})
    }, 20000)
        })
        .catch(() => {
        	message.channel.send('`10 saniye` geçerek kanalları, kategorileri ve rolleri silme işlemi iptal edildi!')
        });
   })
}
   catch (err) {
    
  }
  
};
}