const commando = require('discord.js-commando');
const Discord = require('discord.js');
const instagram = require("user-instagram")

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'instagram',
            aliases: [],
            group: 'util',
            memberName: 'instagram',
            description: 'Arattığınız kullanıcının instagram verilerini gösterir. **YENI**',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 6
             },

			args: [
				{
					key: 'kullanıcı',
					label: 'kullanıcı',
					prompt: 'İnstagram da arayacağın kullanıcı ismi nedir?',
					type: 'string'
				}
			]
        });
    }

    async run(msg, args) {
let kullanıcı = args.kullanıcı;

instagram('https://www.instagram.com/' + kullanıcı)
.then(data => {
  
  const biocuk = (data.bio.length === 0 ? 'Yok' : data.bio)  
  const isimcik = (data.fullName.length === 0 ? 'Yok' : data.fullName)

  var gizlimi;
  var onaylimi;
  
  if (data.isPrivate === false) gizlimi = "Hayır"
  if (data.isPrivate === true) gizlimi = "Evet"
  if (data.isVerified === false) onaylimi = "Hayır"
  if (data.isVerified === true) onaylimi = "Evet"
  
  const embed = new Discord.RichEmbed()
    .setColor(this.client.bilgiler.renk)
    .setAuthor(`${kullanıcı} kullanıcısının instagram bilgileri;`)
    .setThumbnail(`${data.avatarHD}`)
    .addField('Tam ismi', isimcik, true)
    .addField('Takipçi sayısı', `${data.subscriberCount}`, true)
    .addField('Takip ettiği kişi sayısı', `${data.subscribtions}`, true)
    .addField('Gönderi sayısı', `${data.postCount}`, true)
    .addField('Biografisi', biocuk, true)
    .addField('ID', `${data.id}`, true)
    .addField('Profili gizli mi?', `${gizlimi}`, true)
    .addField('Profili onaylanmış mı?', `${onaylimi}`, true)
    .addField('Kullanıcının hesabının linki', `${data.profileLink}`, true)
    .setTimestamp()
    .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
    
  msg.channel.send(embed)
}) 
}
}