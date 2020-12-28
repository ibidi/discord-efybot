const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class Kasa extends Command {
  
	constructor(client) {
		super(client, {
			name: 'kasa-düzenle',
			aliases: ['case-reason', 'casereason', 'kasasebepdüzenle', 'case-reason-edit', 'kasasebep'],
			group: 'moderasyon',
			memberName: 'kasa-düzenle',
			description: 'Kasa numarasındaki sebep bölümünü değiştirmenize/düzenlemenize yarar. **YENI**',
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'kasa',
					label: 'kasa',
					prompt: 'Hangi kasa numarasını düzenlemek istiyorsun?',
					type: 'string'
				},
				{
					key: 'sebep',
					label: 'sebep',
					prompt: 'Yeni sebebin ne olmasını istersin?',
					type: 'string'
				}
			]
		})
	}
  
  
  async run(message, args) {
     async function embedSan(embed) {
    embed.message ? delete embed.message : null;
    embed.footer ? delete embed.footer.embed : null;
    embed.provider ? delete embed.provider.embed : null;
    embed.thumbnail ? delete embed.thumbnail.embed : null;
    embed.image ? delete embed.image.embed : null;
    embed.author ? delete embed.author.embed : null;
    embed.fields ? embed.fields.forEach(f => {delete f.embed;}) : null;
    return embed;
  }
  const msg = message;
	const vt = this.client.provider.get(msg.guild.id, 'modLog', []);
	const db = this.client.provider.get(msg.guild.id, 'modLogK', []);
	if (db ==! "evet") return msg.channel.send('Lütfen `mod-log-ayarla` komutu ile mod-log kanalı belirleyiniz.');
	let modlogg = vt;
	if (!modlogg) return msg.channel.send('Mod-log olarak belirlediğiniz kanal silinmiş, lütfen yeni  bir mod-log kanalı açıp `mod-log-ayarla` komutu ile mod-log olarak ayarlayınız.');
  const modlog = msg.guild.channels.find('id', modlogg);
  const caseNumber = args.kasa;
  const newReason = args.sebep;
  await modlog.fetchMessages({limit:100}).then((messages) => {
    const caseLog = messages.filter(m => m.author.id === this.client.user.id &&
      m.embeds[0] &&
      m.embeds[0].type === 'rich' &&
      m.embeds[0].footer &&
      m.embeds[0].footer.text.includes('Kasa') &&
      m.embeds[0].footer.text === `Kasa: ${caseNumber}`, this.client.user.avatarURL).first();
    if (!caseLog) return message.reply('Aradığınız kasa numarası bulunamıyor.');
    if (!newReason) return message.reply('Bir sebep girmelisin!');
    //if (!newReason) return 
    modlog.fetchMessage(caseLog.id).then(logMsg => {
      const embed = logMsg.embeds[0];
      embedSan(embed);
      var reasonObj = embed.fields.filter((mEmbed) => mEmbed.name === 'Sebep')[0];
      //console.log(reasonObj);
      reasonObj.value = newReason;
      logMsg.edit({embed}).then(() => message.reply('Kasa sebebi başarıyla düzenlenmiştir.')).catch((err) => {
        message.reply('Kasa düzenlenemedi.');
        return console.error(err);
      });
    });
  });
}
}
