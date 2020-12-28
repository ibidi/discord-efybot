const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sunucu-ayarları',
      group: 'ayarlar',
      memberName: 'sunucu-ayarları',
      description: 'Sunucuda yapılmış olan ayarları gösterir.',
      guildOnly: true,
    });
  }
  
      hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_GUILD');
    }
  
  async run(msg) {
        function time(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
		var mesakso = await msg.channel.send(this.client.bilgiler.yukleniyor +` Veriler alınıyor...`)
    await time(Math.floor(Math.random() * (9000) ) + 3)
    const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
    const logsChannel = msg.guild.channels.get(msg.guild.settings.get('logsChannel'))
    const basvuru = msg.guild.channels.get(msg.guild.settings.get('başvuruKanal'))
    const girisRol = msg.guild.roles.get(msg.guild.settings.get('girisRol'))
    const girisRolbot = msg.guild.roles.get(msg.guild.settings.get('girisRolbot'))
    const sayacKanal = msg.guild.channels.get(msg.guild.settings.get('sayacKanal'))
    const sayacSayi = msg.guild.settings.get('sayacSayi')
    const girisCikis = msg.guild.channels.get(msg.guild.settings.get('girisCikis'))
    const rGirisCikis = msg.guild.channels.get(msg.guild.settings.get('girisCikiss'))
    const kfilitresi = msg.guild.settings.get('swearSensor')
    const antispam = msg.guild.settings.get('antispam')
    const rfiltesi = msg.guild.settings.get('reklamEngel')
    const anonsKanal = msg.guild.settings.get('anonsKanal')
    const botKorumaKanal = msg.guild.channels.get(msg.guild.settings.get('botKorumaKanal'))
    const botKoruma = msg.guild.settings.get('botKoruma')
    const ototag = msg.guild.settings.get('otoTag')
    const starboardk = msg.guild.roles.get(msg.guild.settings.get('starboard'))
    const starboards = msg.guild.settings.get('starboardS')
    const embed = new RichEmbed()
    .setColor(this.client.bilgiler.renk)
    .setAuthor(`${msg.guild.name} Sunucusunun Ayarları`)
    .setThumbnail(msg.guild.iconURL)
    .addField(`• Mod-Log`, modlog ? `${modlog}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Log`, logsChannel ? `${logsChannel}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Başvuru`, basvuru ? `${basvuru}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Giriş Rolü`, girisRol ? `${girisRol}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Sayaç`, sayacKanal ? `${sayacKanal}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Sayaç Sayısı`, sayacKanal ? `${sayacKanal}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Giriş Çıkış`, girisCikis ? `${girisCikis}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Resimli Giriş Çıkış`, rGirisCikis ? `${rGirisCikis}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Anons `, anonsKanal ? `${anonsKanal}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Küfür Filtresi`, kfilitresi ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Reklam Filtresi`, rfiltesi ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Spam Filtresi`, antispam ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Bot Koruma Kanalı `, botKorumaKanal ? `${botKorumaKanal}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Bot Koruma`, botKoruma ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Bot Giriş Rolü`, girisRolbot ? `${girisRolbot}` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Oto tag`, ototag ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Starboard Kanalı`, starboardk ? `<:efy_evet:658294325771370506>` : `<:efy_hayir:658294374089621511>`, true)
    .addField(`• Starboard Sayısı`, starboards ? `:stars: ${starboards}` : `<:efy_hayir:658294374089621511>`, true)
    return mesakso.edit('', {embed});
  }
}