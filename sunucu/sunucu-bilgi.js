const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment')
const filterLevels = ['Yok', 'Rolü Olmayanlar İçin', 'Herkes İçin'];
const verificationLevels = ['1', '2', '3', '4', '5'];

module.exports = class ServerCommand extends Command {
    constructor(client) {
        super(client, {
			name: 'sunucu-bilgi',
            group: 'sunucu',
          aliases: ['sb'],
            memberName: 'sunucu-bilgi',
            description: 'Bulunduğunuz sunucu hakkında bilgi verir.',
            examples: ['sunucu-bilgi'],
            guildOnly: true
        });
    }

    async run(message) {
let sunucu = message.guild
const srv = message.guild
const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
// if (preEnabled != true) return message.channel.send('Bu komutu kullanabilmek için özel bir sunucu olması gerek falan filan anla işte.')
		const aylar = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
		}

		var verti = message.guild.verificationLevel;
		const vertific = ['Yok', 'Düşuk', 'Orta', 'Yüksek', 'En Yüksek'];

        const konumlar = {
        "europe": ":flag_eu: Avrupa",
        "russia": ":flag_ru: Rusya",
        "brazil": ":flag_br: Brezilya",
        "eu-central": ":flag_eu: Orta Avrupa",
        "singapore": ":flag_sg: Singapur",
        "us-central": ":flag_us: US Merkez",
        "sydney": ":flag_au: Sidney",
        "us-east": ":flag_us: US Doğu",
        "us-south": ":flag_us: US Güney",
        "us-west": ":flag_us: US Batı",
        "eu-west": ":flag_eu: Batı Avrupa",
        "vip-us-east": ":flag_us: VIP US Doğu",
        "london": ":flag_gb: Londra",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "southafrica": ":flag_za: Güney Afrika"
                }

    var created;
    moment.locale("tr");
    created = moment(message.guild.createdAt).fromNow()
    const c2 = moment(message.guild.createdAt).format('LLLL')
    var onlinePercent = (message.guild.members.filter(member => member.user.presence.status === 'online').size / message.guild.memberCount) * 100;
    var idlePercent = (message.guild.members.filter(member => member.user.presence.status === 'idle').size / message.guild.memberCount) * 100;
    var dndPercent = (message.guild.members.filter(member => member.user.presence.status === 'dnd').size / message.guild.memberCount) * 100;
    var offlinePercent = (message.guild.members.filter(member => member.user.presence.status === 'offline').size / message.guild.memberCount) * 100;
		var kr = message.guild.roles.size * message.guild.channels.size / 100
    kr = kr.toFixed(0);
      const embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, sunucu.iconURL)
			.setColor("#7289DA")
		  .setThumbnail(sunucu.iconURL)
      .addField(`❯ Genel bilgiler`, stripIndents`
      Sahip: ${message.guild.owner.user.tag} - (<@${sunucu.owner.id}>)
      ID: ${sunucu.id}
      Sunucu resmi: [buraya tıkla!](${sunucu.iconURL})
      Oluşturma tarihi: ${c2} - (${created})
      `, false)
      .addField(`❯ Kullanıcı istatistikleri`, stripIndents`
      Üye sayısı: ${srv.members.size.toLocaleString()} (Kullanıcı ${srv.members.filter(member => !member.user.bot).size.toLocaleString()}, Bot ${message.guild.members.filter(m=> m.user.bot).size})
      Durumlar: <:efystatusOnline:668933181050716191> ${message.guild.members.filter(member => member.user.presence.status === 'online').size} (${Math.round(onlinePercent)}%) - <:efystatusIdle:668932594574032927> ${message.guild.members.filter(member => member.user.presence.status === 'idle').size} (${Math.round(idlePercent)}%) - <:efystatusDnd:668932453875974145> ${message.guild.members.filter(member => member.user.presence.status === 'dnd').size} (${Math.round(dndPercent)}%) -       <:efystatusOffline:668932664417320970> ${message.guild.members.filter(member => member.user.presence.status === 'offline').size} (${Math.round(offlinePercent)}%)
      `, false)
      .addField("❯ Genel istatistikler", stripIndents`
      Rol sayısı: ${message.guild.roles.size.toLocaleString()}
      Kanal sayısı: ${message.guild.channels.size.toLocaleString()}
      Veri yüzdesi: %${kr}
      Güvenlik: ${verificationLevels[message.guild.verificationLevel]}/5

      `, true)		
    .addField("❯ Diğer istatistikler", stripIndents`
    Bölge: ${konumlar[message.guild.region]}
    `, true)
    if (preEnabled === true) {
        embed.addField("❯ Global rozetler", stripIndents`
        <:efy_btik:668968450856714257> Özelleştirilen sunucu  
        `, true)
        } else {
          embed.addField("❯ Global rozetler", stripIndents`
        Bu sunucunun global rozeti bulunmuyor.
        `, true)
      }
      message.channel.send(embed)
	};
}
//.addField("- Sunucu Hakkında", `ID: ${sunucu.id}\nOluşturulma Tarihi: ${moment(sunucu.createdAt).format('DD')} ${aylar[moment(sunucu.createdAt).format('MM')]} ${moment(sunucu.createdAt).format('YYYY HH:mm:ss')}\nSahip: ${message.guild.owner.user.tag} - (<@${sunucu.owner.id}>) <:RenwilSword:651166856215789576>`)
	///		.addField(`- Sunucu İstatistikleri`, `Kullanıcılar: ${message.guild.members.size}\nDurum: <:online:614381286194151444> ${message.guild.members.filter(m => m.user.presence.status === "online").size} <:idle:614381286311854096> ${message.guild.members.filter(m => m.user.presence.status === "idle").size} <:dnd:614381286223511562> ${message.guild.members.filter(m => m.user.presence.status === "dnd").size} <:offline:614432866608218122> ${message.guild.members.filter(m => m.user.presence.status === "offline").size}`)
     // .addField("- Diğer İstatistikler", `Bölge: ${konumlar[message.guild.region]}\nDoğrulama: ${verificationLevels[message.guild.verificationLevel]}/5\n Roller: ${message.guild.roles.size}\n Kanallar: ${message.guild.channels.size}\nYazı: ${message.guild.channels.filter(c => c.type === "text").size} \nSesli: ${message.guild.channels.filter(c => c.type === "voice").size}`)
