const stripIndents = require('common-tags').stripIndents;
const moment = require('moment')
const commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'kullanıcı-bilgi',
      aliases: ['kb', 'kullanıcı'],
			group: 'bilgi',
			memberName: 'kullanıcı-bilgi',
			description: 'İstediğiniz bir kişi hakkında bilgi verir.',
			guildOnly: true,

			args: [
				{
					key: 'member',
					label: 'kullanıcı',
					prompt: 'Kimin hakkında bilgi almak istersin?',
					type: 'member',
				}
			]
		});
	}

	run(message, args) {		
		const member = args.member;
		const user = member.user;
			const Durum = user.presence.status;
			const durum = (Durum == "online" ? ("<:ibi_online:784068358370623528>") : (Durum == "offline" ? ("<:ibi_offline:784068357958926336>") : (Durum == "idle" ? ( "<:ibi_idle:784068357540020264>") : (Durum == "dnd" ? ("<:ibi_dnd:784068357191893012>") : ("Bilinmiyor")))))
      let nick;
      if (member.displayName === user.username) nick = `${user.username} [Belirtilmedi]`
      if (member.displayName !== user.username) nick = member.displayName

			var oluşturma = ''
			if(moment(user.createdAt).format('MM') === '01') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Ocak ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '02') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Şubat ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '03') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Mart ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '04') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Nisan ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '05') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '06') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Haziran ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '07') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '08') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '09') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Eylül ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '10') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Ekim ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '11') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Kasım ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '12') {
				var oluşturma = `${moment(user.createdAt).format('DD')} Aralık ${moment(user.createdAt).format('YYYY HH:mm:ss')} `
			}
    
      var katılma = ''
			if(moment(user.createdAt).format('MM') === '01') {
				var katılma = `${moment(user.joinedAt).format('DD')} Ocak ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '02') {
				var katılma = `${moment(user.joinedAt).format('DD')} Şubat ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '03') {
				var katılma = `${moment(user.joinedAt).format('DD')} Mart ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '04') {
				var katılma = `${moment(user.joinedAt).format('DD')} Nisan ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '05') {
				var katılma = `${moment(user.joinedAt).format('DD')} Mayıs ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '06') {
				var katılma = `${moment(user.joinedAt).format('DD')} Haziran ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '07') {
				var katılma = `${moment(user.joinedAt).format('DD')} Temmuz ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '08') {
				var katılma = `${moment(user.joinedAt).format('DD')} Ağustos ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '09') {
				var katılma = `${moment(user.joinedAt).format('DD')} Eylül ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '10') {
				var katılma = `${moment(user.joinedAt).format('DD')} Ekim ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '11') {
				var katılma = `${moment(user.joinedAt).format('DD')} Kasım ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
			if(moment(user.createdAt).format('MM') === '12') {
				var katılma = `${moment(user.joinedAt).format('DD')} Aralık ${moment(user.joinedAt).format('YYYY HH:mm:ss')} `
			}
    
    
    let oynuyor;
    if (user.presence.game === null) oynuyor = "Şu anda bir şey oynamıyorum."
    if (user.presence.game) oynuyor = "Oynuyor: " + user.presence.game.name
    if (user.presence.game && user.presence.game.name === "Spotify") oynuyor =  user.presence.game.details + " - " + user.presence.game.state + " <:efySpotify:647925481815015434>"
    if (user.presence.game && user.presence.game.name === "Custom Status") oynuyor = user.presence.game.state

    
    var rolleri = member.roles.map(roles => `${roles}`).join(' ').replace('@everyone', '')
    
    if (rolleri === "") {
     var rolleri = "Rolleri bulunmuyor.";
    } else {
      var rolleri = rolleri;
    }     
          const süre = this.client.provider.get(member.guild.id, `sesSüre${member.id}+${member.guild.id}`, []);
          const zaman2 = this.client.provider.get(member.guild.id, `sesToplam${member.id}+${member.guild.id}`, []);
          const cevrimicisüre = this.client.provider.get(member.guild.id, `cevrimiciSüre${member.id}+${member.guild.id}`, []);
          const cevrimdisisüre = this.client.provider.get(member.guild.id, `cevrimdisiSüre${member.id}+${member.guild.id}`, []);
          const bostasüre = this.client.provider.get(member.guild.id, `bostaSüre${member.id}+${member.guild.id}`, []);
          const mesgulsüre = this.client.provider.get(member.guild.id, `mesgulSüre${member.id}+${member.guild.id}`, []);
          const ksayısı = this.client.provider.get(member.guild.id, `msgKarS${member.id}+${member.guild.id}`, []);
          const ksayısıs = this.client.provider.get(member.guild.id, `msgKarSs${member.id}+${member.guild.id}`, []);

			    var duration = moment.duration(Number(zaman2)).format('D [gün], H [saat], m [dakika], s [saniye]')
          var cevd = moment.duration(Number(cevrimicisüre)).format('D [gün], H [saat], m [dakika], s [saniye]')
          var cevdurd = moment.duration(Number(cevrimdisisüre)).format('D [gün], H [saat], m [dakika], s [saniye]')
          var bosd = moment.duration(Number(bostasüre)).format('D [gün], H [saat], m [dakika], s [saniye]')
          var mesd = moment.duration(Number(mesgulsüre)).format('D [gün], H [saat], m [dakika], s [saniye]')
				    const embed = new Discord.RichEmbed()
					.setColor(this.client.bilgiler.renk)
          .setThumbnail(user.avatarURL)
					.addField("- Kullanıcı Hakkında", `ID: ${user.id}\nHesabın oluşturulma tarihi: ${oluşturma}\nProfil: ${member}\nAvatar: [Buraya tıkla!](${member.user.displayAvatarURL})\nDurum: ${oynuyor}`)
          .addField("- Kullanıcı Bilgileri", `Kullanıcı adı: ${user.username}\nSunucuya katılım tarihi: ${katılma}\nSunucuya katıldığı sıra: ${member.guild.members.array().sort((a, b) => a.joinedAt - b.joinedAt).map(u => u.user.tag).findIndex(m => m === member.user.tag)+1} / ${member.guild.members.size}\nRolleri: ${rolleri}`)
          .addField("- Kullanıcının Sunucudaki Bilgileri", `${stripIndents`
          Ses kanallarında geçirdiği süre: ${duration}
          Çevrimiçi'nde kaldığı süre: ${cevd}
          Çevrimdışı'nda kaldığı süre: ${cevdurd}
          Rahatsız Etmeyin'de kaldığı süre: ${mesd}
          Boşta'da kaldığı süre: ${bosd}
          Yazılan toplam karakter sayısı: ${ksayısı}
          En yüksek mesajlardaki karakter uzunluğu: ${ksayısıs}
          `}`)
          if (user.id === "725410917319311360") embed.addField("- Global Rütbeleri", `<:ibi_9ay:784067042226470922> Bot Geliştiricisi\n<:ibi_6ay:784067042033532969> Bot ve Sunucu Moderatörü\n<:ibi_3ay:784067041769816125> Bot Beyaz Listeli Kullanıcı`) // ibd
          message.channel.send({embed});
	}
};

function convertMS( milliseconds ) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    }
}