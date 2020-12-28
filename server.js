String.prototype.toProperCase = function() {
  return (
    String(this)
      .charAt(0)
      .toUpperCase() + String(this).slice(1)
  );
};

global.queue = new Map()
global.datas = __dirname
const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando'),
	path = require('path'),
	sqlite = require('sqlite'),
	{ oneLine, stripIndents } = require('common-tags'),
	moment = require('moment-timezone'),
	request = require('request'),
	snekfetch = require('snekfetch'),
	Jimp = require('jimp'),
	fs = require('fs'),
	Discord = require('discord.js'),
	{ RichEmbed } = require('discord.js')
require("moment-duration-format")
const ayarlar = require('./data/ayarlar.json');
moment.tz.setDefault("Europe/Istanbul");
const botConfig = require("./_messages.json");
const Enmap = require("enmap");
const parse = require("pg-connection-string");
const { Pool } = require ('pg'); 
const mysql = require("mysql");
const pgp = require('pg-promise')();
const db = require('quick.db');
const Keyv = require("keyv");
var myMap = new Map();

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const fetch = require("node-fetch");
const { inspect } = require("util");
const { URLSearchParams } = require("url");

const client = new CommandoClient({
	commandPrefix: ayarlar.prefix,
	unknownCommandResponse: false,
	owner: ayarlar.sahipler,
	disableEveryone: true
});
client.queue = new Map();
const Database = require("better-sqlite3");
client.on("ready", async () => {
	console.log(`${client.user.tag} aktif! ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyor!`)
	client.user.setStatus("online")
	client.user.setActivity(`1/1 | !yardım | !davet`, { type: "PLAYING" })
 //client.shard.broadcastEval(client.user.setPresence({ game: { name: `${(client.shard.id+1)}/${client.shard.count} | e:yardım | e:davet`, type: 0 } }));
});

//http.createServer().listen(process.env.PORT2);

client.bilgiler = {
	"renk": "#7289DA",
  "hayır": "<:basarisiz:664584514764275718>",
  "evet": "<:basarili:664584487484784722>",
  "yukleniyor": "<a:ibi_agooglecat:784061651581534209>"
};

// Küfür ve Reklam Engelleme Sistemleri
client
	.on('message', msg => {
		if (!msg.guild) return;
		if (!msg.author.bot) return;
			const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
				const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
				if (veri == !'1') return;
					if (veri2 === '1') return;
						if (veri === '1') {
		  			if (msg.author.id === "407455869643784192") return;
		  		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		  if (swearWords.some(word => msg.content.includes(word))) {
		if (!msg.member.hasPermission(botConfig.hasPerm)) {
	msg.delete();
	let adblockMessage = new Discord.RichEmbed()
		.setTitle("Mesaj kaldırıldı")
		.setDescription("Az önce <@" + msg.author.id + "> tarafından gönderilen sunucu daveti içeren mesaj kaldırıldı")
		.setFooter("EfyBot | Bu mesaj 3 saniye içerisinde kaldırılacaktır!")
		.setColor(botConfig.embedColor)
	return msg.channel.send(adblockMessage).then(msg => msg.delete(3000));
}}}})

client
	.on('message', msg => {
		if (!msg.guild) return;
			const veri = client.provider.get(msg.guild.id, 'swearSensor', []);
				const veri2 = client.provider.get(msg.guild.id, 'swearingSensor', []);
					if (veri == !'1') return;
						if (veri2 === '1') return;
							if (veri === '1') {
						 if (msg.author.id === "407455869643784192") return;
						const swearWords = ["amk","dildo","penis","salak","götoş","sikik","sie","s.g","a.m.k","am.k","a.mk","a.q","a.q.","o.ç","kaltak","p!ç","p.iç","p.i.ç","pıç","pic","oc","p.ic","pi.ç","oç","göt","piç","pezevenk","yavşak","ipne","ibne","sürtük","orospu","öç","gavat","gav:horse:","gevşek","bitch","fuck","aq","amq","mq","amcık","amıcık","göt"];
		  			if (swearWords.some(word => msg.content.includes(word))) {
				if (!msg.member.hasPermission(botConfig.hasPerm)) {
			msg.delete();
			let swearBlockEmbed = new Discord.RichEmbed()
				.setTitle("Mesaj kaldırıldı")
				.setDescription("Az önce <@" + msg.author.id + "> tarafından gönderilen küfürlü mesaj kaldırıldı")
				.setFooter("EfyBot | Bu mesaj 3 saniye içerisinde kaldırılacaktır!")
				.setColor(botConfig.embedColor)
	 return msg.channel.send(swearBlockEmbed).then(msg => msg.delete(3000));
}}}})


// Sunucu Panel Sistemi
client.on("guildMemberAdd", async (member) => {
const guild = member.guild;
  const s = client.channels.get(guild.settings.get('skanalı'))
  const s2 = client.channels.get(guild.settings.get('skanalı2'))
  if(!s) return;
  if(!s2) return;
  let rdnd1 = guild.members.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size
 await s.setName('Üye Sayısı: ' + guild.members.size)
  setInterval(() => {
  let rdnd2 = guild.members.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size
 if(rdnd2 > rdnd1) {
 s2.setName('Rekor Çevrimiçi: ' + rdnd1)  
 } else {
 }
    }, 5000)
});
client.on("guildMemberRemove", async (member) => {
  const guild = member.guild;
  const s = client.channels.get(guild.settings.get('skanalı'))
  if(!s) return;
  let rdnd1 = guild.members.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size
 s.setName('Üye Sayısı: ' + guild.members.size)
});
client.on("channelCreate", async (c) => {
  const guild = c.guild;
  const s = client.channels.get(guild.settings.get('skanalı4'));
  if(!s) return;
   s.setName('Kanal Sayısı: ' + guild.channels.size);
});
client.on("channelDelete", async (c) => {
  const guild = c.guild;
  const s = client.channels.get(guild.settings.get('skanalı4'));
  if(!s) return;
   s.setName('Kanal Sayısı: ' + guild.channels.size);
});
client.on("roleCreate", async (r) => {
  const guild = r.guild;
  const s = client.channels.get(guild.settings.get('skanalı3'));
  if(!s) return;
  s.setName('Rol Sayısı: ' + guild.roles.size);
});
client.on("roleDelete", async (r) => {
  const guild = r.guild;
  const s = client.channels.get(guild.settings.get('skanalı3'));
  if(!s) return;
  s.setName('Rol Sayısı: ' + guild.roles.size);
});
process.on('unhandledRejection', error => {
    console.error(`HATA: \n${error.stack}`);
});

// Blacklist/Whitelist Sistemi
client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
  var embed = new Discord.RichEmbed()
  .setAuthor(msg.author.tag,msg.author.avatarURL)
.setColor(client.bilgiler.renk)
.setDescription(`
Bottan kalıcı olarak yasaklandın ${client.bilgiler.ban}

Bunun sonucunda botun fonksiyonlarını kullanamayacaksın. İşte yasaklanmanı kaldırman için bir kaç tavsiye;
**•** **efybot@gmail.com** adresine mail atabilirsin.
**•** **ibd#0042**'ye dm üzerinden mesaj atabilirsin.
`)
	msg.channel.send(embed);
	return true;
});

const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
  // "ready" isn't really ready. We need to wait a spell.
  wait(1000);

  // Load all invites for all guilds and save them to the cache.
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', member => {
  // To compare, we need to load the current invite list.
   member.guild.fetchInvites().then(guildInvites => {
    
    const ei = invites[member.guild.id];
  
    invites[member.guild.id] = guildInvites;
 
    const invite = guildInvites.find(x => ei.get(x.code).uses < x.uses);

    const davetçi = client.users.get(invite.inviter.id);
    if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'davetEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'davetKanal', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
    // A real basic message with the information we need.
      const vt = this.client.provider.get(member.guild.id, 'Davetmem', []);
      if(member.id === vt) return;
    member.guild.channels.get(logCh).send(`${member.user.tag} isimli üye ${davetçi.tag} tarafından sunucuya davet edildi. Davet ettiği kişi sayısı **${invite.uses}**`);
    client.provider.set(member.guild.id, 'Davetmem', `${member.id}`)
    }
   })
  });
client.on('guildMemberRemove', member => {
  member.guild.settings.remove(member.guild.id, 'Davetmem', `${member.id}`);
});
/*client.on("ready", async () => {
  var guildhook = new Discord.WebhookClient("641373411263643709", "kpwRLVTBO_dhaOf7w3CfrbLRsLE8ny7PdbqKE-7OqhOSeoN1T2-rtWulitHk-nCJg-8L")
  const embed = new Discord.RichEmbed()
  .setThumbnail(client.user.avatarURL)
  .setDescription(`**${client.user.tag}** adlı bot başarılı bir şekilde **açılarak** sunuculara ping göndermeye başlamıştır.`)
  .addField(`- Botun istatistikleri`, `**•** Sunucu Sayısı: ${client.guilds.size}\n**•** Kullanıcı Sayısı: ${client.users.size}\n**•** Kanal Sayısı: ${client.channels.size}`, true)
  .setFooter('Efy, ibd#0042 tarafından ♥ ile yapıldı.', client.user.avatarURL)
  .setColor("65cafe")
  client.channels.get("641388023237443617").send(embed)
 });*/ 

 // Afk Sistemi
client.on('message', msg => {
		if (!msg.guild) return;
		const status = client.provider.get(msg.author.id, 'afkStatus', []);
		const before = client.provider.get(msg.author.id, 'afkBefore', []);
		const guildid = client.provider.get(msg.author.id, 'afkGuild', []);
		if (status === "1") {
			if (msg.guild.id === guildid) {
				client.provider.set(msg.author.id, 'afkReason', "null");
				client.provider.set(msg.author.id, 'afkStatus', "0");
				msg.member.setNickname(before);
				return msg.channel.send('Hey ' + msg.author.username + ', tekrardan hoş geldin! :wave:');
			} else {
				return;
			}
		} else {
			return;
		}
	})

	.on('message', msg => {
		if (!msg.guild) return;
		if (msg.author.bot) return;
		if (!msg.mentions.users.first()) return;
		const status = client.provider.get(msg.mentions.users.first().id, 'afkStatus', []);
		const reason = client.provider.get(msg.mentions.users.first().id, 'afkReason', []);
		if (status === "1") {
			msg.channel.send('**' + msg.mentions.users.first().tag + '** şuanda AFK.\n **Sebep:** ' + reason + '')
		}
	});


// Resimli Giriş Çıkış Sistemi
client.on("guildMemberAdd", async member => {
const veri = client.provider.get(member.guild.id, "girisCikisK", []);
if (veri ==! true) return;
if (veri === true) {
  const kanalveri = client.provider.get(member.guild.id, "girisCikiss", []);
  let username = member.user.username;
  if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
  if (member.guild.channels.get(kanalveri).type === "text") {
    let randname = await randomString(16, 'aA');
    const bg = await Jimp.read("https://cdn.discordapp.com/attachments/517030385004314667/517741871942991873/guildAdd.png");
    const userimg = await Jimp.read(member.user.avatarURL);
    var font;
    if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    await bg.print(font, 430, 170, member.user.tag);
    await userimg.resize(362, 362);
    await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
      setTimeout(function () {
        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
      }, 1000);
      setTimeout(function () {
      fs.unlink("./img/" + randname + ".png");
      }, 10000);
  }
}
})

client.on("guildMemberRemove", async member => {
	const veri = client.provider.get(member.guild.id, "girisCikisK", []);
	if (veri ==! true) return;
	if (veri === true) {
	  const kanalveri = client.provider.get(member.guild.id, "girisCikiss", []);
	  let username = member.user.username;
	  if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
	  if (member.guild.channels.get(kanalveri).type === "text") {
		let randname = await randomString(16, 'aA');
		const bg = await Jimp.read("https://cdn.discordapp.com/attachments/517030385004314667/517742564754063361/guildRemove.png");
		const userimg = await Jimp.read(member.user.avatarURL);
		var font;
		if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
		else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
		else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
		await bg.print(font, 430, 170, member.user.tag);
		await userimg.resize(362, 362);
		await bg.composite(userimg, 43, 26).write("./img/"+ randname + ".png");
		  setTimeout(function () {
			member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
		  }, 1000);
		  setTimeout(function () {
		  fs.unlink("./img/" + randname + ".png");
		  }, 10000);
	  }
	}
	})

// Giriş Rolü Sistemleri 
client.on('guildMemberAdd', async member => {
	if(member.user.bot) return;
	  const veri = client.provider.get(member.guild.id, 'girisRolK', []);
	  if (veri == ! true) return;
	  if (veri === true) {
		  const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
		  if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
		  member.addRole(girisrolveri);
	  }
  })
  
  client.on('guildMemberAdd', async member => {
	  const veri = client.provider.get(member.guild.id, 'girisRolbotK', []);
	  if (veri == ! true) return;
	  if (veri === true) {
	  if(member.user.bot !==true){
  
		  } else {
		  const girisrolveri = client.provider.get(member.guild.id, 'girisRolbot', []);
		  if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
		  member.addRole(girisrolveri);
		}
	}
  })

// Oto Tag Sistemi
client.on("guildMemberAdd", async member => {
const veri = client.provider.get(member.guild.id, "otoTag", []);
if(!veri) return;
  if(veri) {
    member.setNickname(veri + ' ' + member.user.username + '')
  }
})

// Giriş Çıkış Mesaj Sistemleri
client.on('guildMemberAdd', async member => {
	let omsg = client.provider.get(member.guild, "girisMesaj");
	let schannel = member.guild.channels.get(client.provider.get(member.guild, "girisCikis", []));
	if (!schannel) return;
	if (!schannel.send) return;
	if (!omsg) return omsg = ":inbox_tray: **<kullanıcı>** adlı kişi sunucuya katıldı.";
	omsg = omsg.replace(/<kullanıcı>/, member.user.toString()).replace(/<üye>/, member.guild.members.size).replace(/<sunucu>/, member.guild.name)
	schannel.send(omsg);
})

client.on('guildMemberRemove', async member => {
	let omsg = client.provider.get(member.guild, "cikisMesaj");
	let schannel = member.guild.channels.get(client.provider.get(member.guild, "girisCikis", []));
	if (!schannel) return;
	if (!schannel.send) return;
	if (!omsg) return omsg = ":outbox_tray: **<kullanıcı>** adlı kişi sunucudan ayrıldı.";
	omsg = omsg.replace(/<kullanıcı>/, member.user.toString()).replace(/<üye>/, member.guild.members.size).replace(/<sunucu>/, member.guild.name)
	schannel.send(omsg);
})

// Sayaç Sistemi
client.on('guildMemberAdd', member => {
	const sayacKanal = client.provider.get(member.guild.id, 'sayacKanal', []);
	const sayacSayi = client.provider.get(member.guild.id, 'sayacSayi', []);
	if (!sayacKanal) return;
	if (member.guild.channels.get(sayacKanal) === undefined || member.guild.channels.get(sayacKanal) === null) return;
	if (member.guild.channels.get(sayacKanal).type === "text") {
		member.guild.channels.get(sayacKanal).send(`:inbox_tray: **• \`${member.user.username}\`** sunucuya katıldı. \`${sayacSayi}\` kişi olmamıza \`${sayacSayi - member.guild.members.size}\` kişi kaldı!`);
		if (sayacSayi === member.guild.members.size) return member.guild.channels.get(sayacKanal).send(`Tebrikler! \`${sayacSayi}\` kişiye ulaştık 🎉, sayaç başarılı bir şekilde **sıfırlandı!**`)
	}
}
);

client.on('guildMemberRemove', member => {
	const sayacKanal = client.provider.get(member.guild.id, 'sayacKanal', []);
	const sayacSayi = client.provider.get(member.guild.id, 'sayacSayi', []);
	if (!sayacKanal) return;
	if (member.guild.channels.get(sayacKanal) === undefined || member.guild.channels.get(sayacKanal) === null) return;
	if (member.guild.channels.get(sayacKanal).type === "text") {
		member.guild.channels.get(sayacKanal).send(`:outbox_tray: **• ${member.user.username}** sunucudan ayrıldı. \`${sayacSayi}\` kişi olmamıza \`${sayacSayi - member.guild.members.size}\` kişi kaldı!`);
	}
});

// Bot Koruma Sistemi
client.on('guildMemberAdd', member => {
	const enabled = client.provider.get(member.guild.id, 'botKoruma', []);
	if (enabled !== "1") return;
	const bkanal = client.provider.get(member.guild.id, 'botKorumaKanal', []);
	if (member.guild.channels.get(bkanal) === undefined || member.guild.channels.get(bkanal) === null) return;
	if (member.guild.channels.get(bkanal).type === "text") {
		if(member.user.bot !==true){

		} 
		else {
		member.kick("İzinsiz giriş")
		member.guild.channels.get(bkanal).send(`${member} isimli bot sunucuya izinsiz giriş yaptığı için atıldı.`)
	};
};
});

//capslock
client.on("message", async msg => {
    let caps1 = client.provider.get(msg.guild, 'capslock-engelle')
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 2) {
        if (caps1) {
            if (getStringCapsPercent(msg.content) > 60 && msg.content !== '' && !msg.author.bot) {
                if (!msg.member.hasPermission("ADMINISTRATOR")) {
                    if (!msg.mentions.users.first()) {
                        msg.delete()
                        return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(10000))
                    }
                }
            }
        }
    }
});

function getStringCapsPercent(string) {
    let str = string.trim().replace(/<a?:(.*?):\d+>/g, '');
    let length = str.replace(/[^a-zа-яA-ZА-ЯІЇЁёії]/g, '').length;
    if (length === 0) return;
    let caps = str.replace(/[^A-ZА-ЯІЇЁ]/g, '').length;
    return Math.round(caps / length * 100);
}

//geçici oda sistemi

client.on('voiceStateUpdate', (oldMember, member) => {
	
  // Check if the user entered a new channel.
    if (member.voiceChannelID) {
    const newChannel = member.guild.channels.get(member.voiceChannelID);       
        
        // If the user entered a game channel (prefixed with a game controller unicode emoji), group them into their own channel.
        if (newChannel.name.startsWith('💳 Özel Oda')) {
            newChannel.clone(String.fromCodePoint('0x1F3AE') + 'Özel Oda' + ` [${member.displayName}]`, true)
                .then(createdChannel => {
                    createdChannel.edit({
                            bitrate: 64000,
                            position: newChannel.position + 50,
              userLimit: newChannel.userLimit              
            })           
            .then(createdChannel => {
            let category = member.guild.channels.find(c => c.name == "gruplar" && c.type == "category");

            if (!category) {
              throw member.send('**[Otomatik sesli grup sistemi] [EKLENMESİ GEREKEN!]** Lütfen sunucu yetkililerinden **gruplar** adlı bir kategori bu sunucuda olmadığı için seni odaya taşıyamadığımı ilet!');
            }
            createdChannel.setParent(category.id);                                          
                          
                member.setVoiceChannel(createdChannel)
                                .then(console.log('[' + new Date().toISOString() + '] Moved user "' + member.user.username + '#' + member.user.discriminator + '" (' + member.user.id + ') to ' + createdChannel.type + ' channel "' + createdChannel.name + '" (' + createdChannel.id + ') at position ' + createdChannel.position))
                                .catch(console.error);
                        
            
          })
          .catch(console.error);
                })
                .catch(console.error);
        }
    }
    
    // Check if the user came from another channel.
    if (oldMember.voiceChannelID) {
        const oldChannel = oldMember.guild.channels.get(oldMember.voiceChannelID);
        
        // Delete the user's now empty temporary channel, if applicable.
        if (!oldChannel.name.startsWith(String.fromCodePoint('0x1F3AE') + 'Özel Oda')) return; 
          if (oldChannel.members.array().length) return;
            oldChannel.delete()
                .then(function() {
                    console.log('[' + new Date().toISOString() + '] Deleted ' + oldChannel.type + ' channel "' + oldChannel.name + '" (' + oldChannel.id + ')');
                })
                .catch(console.error);
        
    }
});

// Reorder channels when one is created.
client.on('channelCreate', function(channel){
  if (!channel.client.channels.get(c => c.name == "gruplar" && c.type == "category")) return;
    if(!channel.name.startsWith(String.fromCodePoint('0x1F3AE') + 'Özel Oda' + ` [${channel.displayName}]`)){
        orderChannels();
    }
});

// Reorder channels when one is deleted.
client.on('channelDelete', function(channel){
    if(!channel.name.startsWith(String.fromCodePoint('0x1F3AE') + 'Özel Oda' + ` [${channel.displayName}]`)){
        orderChannels();
    }
});

// Function to reorder channels.
function orderChannels(){
    // Get a list of channels.
    var channelsOrdered = client.channels.array().slice(0);
    
    // Evaluate only voice channels.
    channelsOrdered = channelsOrdered.filter(function(channel) {
        return channel.type == 'voice' && typeof channel.position !== 'undefined';
    });
    
    // Sort channels by their current position.
    channelsOrdered = channelsOrdered.sort(function(channelA, channelB) {
        return channelA.position - channelB.position;
    });
    
    // Re-sort channels to support auto-grouping and maximum voice quality.

}

//destek sistemi
client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.channel.type == 'dm') return;
    let a = client.provider.get(msg.guild.id, 'desteksistemi', []);
    const reason = msg.content.split(" ").slice(1).join(" ");
    for (var i = 0; i < a.length; i++) {
        if (a[i].kanal === msg.channel.id) {
          let kanal = msg.guild.channels.find(c => c.name == `destek-${msg.author.id}`);
            if(kanal) return msg.channel.send(msg.author + ' üzerinize kayıtlı zaten bir talep bulunuyor.').then(m=> {
            m.delete(3000)
            })
            if (!msg.guild.roles.some(role => role.id === a[i].rol)) return msg.reply(`Destek sistemini ayarlarken destek rolünü ayarlamayı unutmuşunuz yada yanlışlıkla rolü sildiniz. Eğer rolü sildiyseniz tekrardan \`${msg.guild.commandPrefix}destek-sistemi-ayarlar\` komutu ile tekrardan sıfırdan kurulum yapınız.`).then(m2 => {
                m2.delete(5000)
            });
            let b = msg.guild.channels.find(c => c.id === a[i].kategori);
            let c1 = msg.guild.roles.find(role => role.id === a[i].rol);
            let d = msg.guild.roles.find(role => role.name === "@everyone");
            msg.guild.createChannel(`destek-${msg.author.id}`, "text").then(c => {
c.overwritePermissions(c1, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
      c.overwritePermissions(d, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
      });
      c.overwritePermissions(msg.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
      });
                c.setParent(b)

                const embed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${client.user.username} | Destek Sistemi`)
                    .addField(`Merhaba ${msg.author.username}!`, `Yetkililer burada seninle ilgilenecektir. \nDestek talebini kapatmak için \`${msg.guild.commandPrefix}kapat\` yazabilirsin.`)
                    .addField(`» Talep Konusu/Sebebi:`, `${msg.content}`, true)
                    .addField(`» Kullanıcı:`, `<@${msg.author.id}>`, true)
                    .setFooter(`${client.user.username} | Destek Sistemi`)
                    .setTimestamp()
                c.send({
                    embed: embed
                })
                c.send(`<@${msg.author.id}> Adlı kullanıcı "\`${msg.content}\`" sebebi ile destek talebi açtı! Lütfen Destek Ekibini bekle, @here`)
                msg.delete()
            }).catch(console.error);
        }
    }
});

// Spam Sistemi
client.on('message', async function(msg) {
if (!msg.guild) return;
if (msg.author.bot) return;
let msa = msg.author
const veri = client.provider.get(msg.guild.id, 'antispam', []);
if (veri ==! true) return;
const uyars = client.provider.get(msg.member.user.id, 'uyarSayısı', []);
const eskiuyarıs = Number(uyars);
const uyarsno = parseInt(eskiuyarıs) + 1;
if (veri === true) {
  this.collector = new Discord.MessageCollector(msg.channel, m => !m.author.bot, { maxMatches: 2, time: 800 });
  this.collector.on('collect', message => {
    let userr = message.guild.members.get(msg.author.id);
if (userr.hasPermission("BAN_MEMBERS")) {
    
  } else {
  const embed = new Discord.RichEmbed()
  .setAuthor(msg.member.user.username, msg.member.user.avatarURL)
  .setDescription('Spam yapmayı kes yoksa mesajlarını silmeye devam ediceğim. (' + uyarsno + '/3)')
  .setFooter(client.user.tag, client.user.avatarURL)
  client.provider.set(msg.member.id, 'uyarSayısı', uyarsno);
  if(uyarsno == 3) {
    msg.channel.overwritePermissions(msg.member.user.id, {'SEND_MESSAGES':false})
    client.provider.set(msg.member.id, 'uyarSayısı', 0);
  }
    msg.channel.send(embed).then(m => {
     return m.delete(1000);
  })
  message.delete(600);
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'antispam', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
        const embed2 = new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('Spam Algılandı')
    .setDescription(`**${msg.author.tag}** tarafından <#${msg.channel.id}> kanalın'da spam yapıldığı için susturdum.`)
    return msg.guild.channels.get(logCh).send({embed2});
};
}
});
};
});

// Log Sistemi
client
	.on('guildMemberAdd', async member => { // sistem çalışıyor > 05.01.2020 23:09
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			member.guild.channels.get(logCh).send(
    `[**${moment().format('LTS')}**] ` +
      ":inbox_tray: " +
      member.user.tag +
      " (`" +
      member.id +
      "`) isimli kullanıcı sunucuya katıldı. " +
      `(Kullanıcının hesabı ${moment(new Date())
        .diff(member.user.createdAt, "days")
        .toLocaleString()} gün önce kuruldu.)`
  );
		}
	})
	.on('guildMemberRemove', async member => { // sistem çalışıyor > 05.01.2020 23:09
  if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
      member.guild.channels.get(logCh).send(
    `[**${moment().format('LTS')}**] ` +
      "📤 " +
      member.user.tag +
      " (`" +
      member.id +
      "`) isimli kullanıcı sunucudan ayrıldı. "
  );
    }
  })
	.on('guildMemberRemove', async member => { // sistem çalışıyor > 05.01.2020 23:10
    await member.guild.fetchAuditLogs().then(async audit => {
    let a = await audit.entries.first();
    if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
      if (a.action == `MEMBER_KICK`) {
      member.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] 🔐 ${a.executor.tag} (\`${a.executor.id}\`) tarafından **${a.target.tag} isimli üye sunucudan atıldı.**`)
        }
      }
		})
	})
	
	.on('guildBanAdd', async (guild, member) => { // sistem çalışıyor > 05.01.2020 23:10
    await guild.fetchAuditLogs().then(async audit => {
    let a = await audit.entries.first();
    let silenk = await audit.entries.first().executor;
    if (a.action == `MEMBER_BAN_ADD`) {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :boot: **${silenk.tag}** tarafından (\`${member.id}\`) idli kullanıcı yasaklandı.`);
      }
		}
	})
})
	
	.on('guildBanRemove', async (guild, member) => { // sistem çalışıyor > 05.01.2020 23:11
    //const g = client.guilds.get(member.guild.id)
    await guild.fetchAuditLogs().then(async audit => {
    let a = await audit.entries.first();
    let silenk = await audit.entries.first().executor;
    if (a.action == `MEMBER_BAN_REMOVE`) { // berkoşşşş kod çalıyor
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :pushpin: **${silenk.tag}** tarafından (\`${member.id}\`) idli kullanıcının yasağı kaldırıldı.`);
		  }
    }
	})
})	
	.on('messageDelete', async msg => { // sistem çalışıyor > 05.01.2020 23:12
		if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
			if (msg.author.bot) return;
			msg.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] 🗑️ ${msg.author.tag} (\`${msg.author.id}\`) isimli kullanıcı tarafından gönderilen bir mesaj ${msg.channel} kanalında silindi.\nMesaj: \`${msg.content}\``);
		}
	})
	
	.on('channelCreate', async channel => { // sistem çalışıyor > 05.01.2020 23:13
  await channel.guild.fetchAuditLogs().then(async audit => {
    let a = await audit.entries.first();
    let silenk = await audit.entries.first().executor;
    if (a.action == `CHANNEL_CREATE`) {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :package: **${silenk.tag}** tarafından #${channel.name} adlı metin kanalı oluşturuldu.`);
			};
			if (channel.type === "voice") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :package: **${silenk.tag}** tarafından **${channel.name}** adlı ses kanalı oluşturuldu.`);
			  }
      if (channel.type === "category") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :package: **${silenk.tag}** tarafından **${channel.name.toUpperCase()}** adlı kategori oluşturuldu.`);
			  }
      }
		}
	})
})
		
	.on('channelDelete', async channel => { // sistem çalışıyor > 05.01.2020 23:13
    await channel.guild.fetchAuditLogs().then(async audit => {
    let a = await audit.entries.first();
    let silenk = await audit.entries.first().executor;
    if (a.action == `CHANNEL_DELETE`) {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :wastebasket: ${silenk.tag} tarafından **${channel.name}** adlı metin kanalı silindi.`);
			};
			if (channel.type === "voice") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :wastebasket: ${silenk.tag} tarafından **${channel.name}** adlı sesli kanalı silindi.`);
			  }
      if (channel.type === "category") {
				channel.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :wastebasket: ${silenk.tag} tarafından **${channel.name.toUpperCase()}** adlı kategori silindi.`);
			  }
      }
		}
	})
})

	.on('messageUpdate', async (oldMsg, newMsg) => { // sistem çalışıyor > 05.01.2020 23:13
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			oldMsg.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**]` + " :pencil: " +
      oldMsg.author.tag +
      " (**" +
      oldMsg.author.id +
      "**) isimli kullanıcı tarafından gönderilen bir mesaj " +
      oldMsg.channel +
      " kanalında düzenlendi.\n**E:** `" +
      oldMsg.content +
      "` \n**Y:** `" +
      newMsg.content + "`")
		};
	})
.on('voiceStateUpdate', async (voiceOld, voiceNew) => { // sistem çalışıyor > 05.01.2020 23:14

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
if (!voiceOld.guild) return;
		const enabled = client.provider.get(voiceOld.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(voiceOld.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (voiceOld.guild.channels.get(logCh) === undefined || voiceOld.guild.channels.get(logCh) === null) return;
		if (voiceOld.guild.channels.get(logCh).type === "text") {

	await voiceOld.guild.fetchAuditLogs().then(logs => {
    var a = logs.entries.first()
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] <:efy_m2:663463846757007390> ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üye ${userTag} tarafından \`${voiceNew.voiceChannel.name}\` adlı sesli kanalında susturuldu.`);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
			voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] <:efy_m:663463714904735755> ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üyenin ${userTag} tarafından \`${voiceNew.voiceChannel.name}\` adlı sesli kanalında susturulması kaldırıldı.`);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
			voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] <:efy_h2:663464387704651785> ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üyenin ${userTag} tarafından \`${voiceNew.voiceChannel.name}\` adlı sesli kanalında sağırlaştırıldı.`);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
			voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] <:efy_h:663463144856748054> ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üyenin ${userTag} tarafından \`${voiceNew.voiceChannel.name}\` adlı sesli kanalında sağırlaştırılması kaldırıldı.`);
		}
	})
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {

		voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ☎️ ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üye **#${voiceNew.voiceChannel.name}** kanalına girdi.`);
	}
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
    
		voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ☎️ ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üye **#${voiceOld.voiceChannel.name}** kanalından ayrıldı.`);
	}
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
		voiceOld.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ☎️ ${voiceOld.user.tag} (\`${voiceOld.user.id}\`) isimli üye **#${voiceOld.voiceChannel.name}** isimli kanaldan **#${voiceNew.voiceChannel.name}** kanalına geçti.`);
    }
  }
})

.on('guildMemberAdd', async member => { // sistem çalışıyor > 05.01.2020 23:17
if(member.user.bot === true) {
  const entry = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
      member.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :robot: **${silenk.tag}** tarafından ${entry.target} isimli bot sunucuya davet edildi.`);
    }
};
})

.on("emojiCreate", async emoji => { // sistem çalışıyor > 05.01.2020 23:17
  const entry = await emoji.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
      emoji.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] 🔑 Sunucuya ${emoji} (\`${emoji.name}\`) emojisi eklenmiştir.`)
    }
})
.on("emojiDelete", async emoji => { // sistem çalışıyor > 05.01.2020 23:17
  const entry = await emoji.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
		if (!emoji.guild) return;
		const enabled = client.provider.get(emoji.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(emoji.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (emoji.guild.channels.get(logCh) === undefined || emoji.guild.channels.get(logCh) === null) return;
		if (emoji.guild.channels.get(logCh).type === "text") {
      emoji.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] :wastebasket: Sunucudan (\`${emoji.name}\`) emojisi silinmiştir.`)
    }
})
  .on("guildMemberUpdate", async (oldMember, newMember) => { // sistem çalışıyor > 05.01.2020 23:18
    if(oldMember.displayName === newMember.displayName) return;
    const entry = await oldMember.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
		if (!oldMember.guild) return;
		const enabled = client.provider.get(oldMember.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMember.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMember.guild.channels.get(logCh) === undefined || oldMember.guild.channels.get(logCh) === null) return;
		if (oldMember.guild.channels.get(logCh).type === "text") {
    oldMember.guild.channels.get(logCh).send(silenk.nickname === null
        ? `[**${moment().format('LTS')}**] ` +
            ":pencil2: " +
            oldMember.user.tag +
            " (`" +
            oldMember.user.id +
            "`) isimli kullanıcının sunucu içi ismi \`" +
            newMember.user.username +
            "\` olarak değiştirilmiştir."
        : `[**${moment().format('LTS')}**] ` +
            ":pencil2: " +
            oldMember.user.tag +
            " (`" +
            oldMember.user.id +
            "`) isimli kullanıcının sunucu içi ismi \`" +
            newMember.nickname +
            "\` olarak değiştirilmiştir."
    );
  }
})
.on("messageReactionAdd", async (reaction, user) => { // sistem çalışıyor > 05.01.2020 23:18
  const emoji = reaction.emoji;
  const msg = reaction.message;
  if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
      msg.guild.channels.get(logCh).send(
    `[**${moment().format('LTS')}**] ` +
      ":link: " +
      msg.channel +
      " (`" +
      msg.channel.id +
      "`) kanalındaki bir mesaja " +
      user.tag +
      " (`" +
      user.id +
      "`) tarafından " +
      (emoji === undefined
        ? "`" + emoji.name + "`"
        : emoji + " (`" + emoji.name + "`)") +
      " tepkisi eklendi.\nMesaj: `" +
      msg.content +
      "`"
  );
    }
})
.on("messageReactionRemove", async (reaction, user) => { // sistem çalışıyor > 05.01.2020 23:18
  const emoji = reaction.emoji;
  const msg = reaction.message;
  if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
      msg.guild.channels.get(logCh).send(
    `[**${moment().format('LTS')}**] ` +
      ":link: " +
      msg.channel +
      " (`" +
      msg.channel.id +
      "`) kanalındaki bir mesajdan " +
      user.tag +
      " (`" +
      user.id +
      "`) tarafından " +
      (emoji === undefined
        ? "`" + emoji.name + "`"
        : emoji + " (`" + emoji.name + "`)") +
      " tepkisi kaldırıldı.\nMesaj: `" +
      msg.content +
      "`"
  );
    }
})

.on("guildMemberUpdate", async (oldMember, newMember) => { // sistem çalışıyor > 05.01.2020 23:18
  if (!oldMember.guild) return;
		const enabled = client.provider.get(oldMember.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMember.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMember.guild.channels.get(logCh) === undefined || oldMember.guild.channels.get(logCh) === null) return;
		if (oldMember.guild.channels.get(logCh).type === "text") {
  if (oldMember.roles.array() !== newMember.roles.array()) {
    var arr = [];
    var x;
    oldMember.roles.forEach(async x => {
      if (!newMember.roles.array().includes(x)) {
        arr.push(x);
      }
    });
    if (newMember.roles.size < oldMember.roles.size)
      x = `[**${moment().format('LTS')}**] :heavy_minus_sign: ${newMember.user.tag} (\`${
        newMember.user.id
      }\`) isimli kullanıcıdan ${
        newMember.guild.roles.find(r => r === arr[0]).name
      } (\`${
        newMember.guild.roles.find(r => r === arr[0]).id
      }\`) isimli rol alınmıştır.`;
    newMember.roles.forEach(async x => {
      if (!oldMember.roles.array().includes(x)) {
        arr.push(x);
      }
    });
    if (newMember.roles.size > oldMember.roles.size)
      x = `[**${moment().format('LTS')}**] :heavy_plus_sign: ${newMember.user.tag} (\`${
        newMember.user.id
      }\`) isimli kullanıcıya ${
        newMember.guild.roles.find(r => r === arr[0]).name
      } (\`${
        newMember.guild.roles.find(r => r === arr[0]).id
      }\`) isimli rol verilmiştir.`
  }
      oldMember.guild.channels.get(logCh).send(x)
    }
})
.on("roleUpdate", async (e, y) => { // sistem çalışıyor > 05.01.2020 23:18
    const entry = await e.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
    if (!e.guild) return;
		const enabled = client.provider.get(e.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(e.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (e.guild.channels.get(logCh) === undefined || e.guild.channels.get(logCh) === null) return;
		if (e.guild.channels.get(logCh).type === "text") {
      if(e.id === y.id) {
  if(e.name === y.name) {} else {
    e.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ⭐ ${silenk.tag} (\`${silenk.id}\`) tarafından **${e.name}** isimli rolün ismi **${y.name}** olarak değiştirildi.`)
      }
  if(e.color === y.color) {} else {
    e.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ⭐ ${silenk.tag} (\`${silenk.id}\`) tarafından **${e.name}** isimli rolün rengi **${y.color}** olarak değiştirildi.`)
      }
  if(e.hoist === y.hoist) {} else {
    e.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ⭐ ${silenk.tag} (\`${silenk.id}\`) tarafından **${e.name}** isimli rolün ayrı gösterimi **${y.hoist ? "açık" : "kapalı"}** olarak ayarlandı.`)
      }
  if(e.mentionable === y.mentionable) {} else {
    e.guild.channels.get(logCh).send(`[**${moment().format('LTS')}**] ⭐ ${silenk.tag} (\`${silenk.id}\`) tarafından **${e.name}** isimli rolün etiketlenebilirliği **${y.hoist ? "açık" : "kapalı"}** olarak ayarlandı.`)
      }
    }
  }
}) // barış burada sakso çektireceğim sana buradaki şeyi yap hemen s3x for berkoşşşşşşşşşşşşşşşşşşşşşşşşşşşş and ihs3xxxxxxxxx
.on("roleUpdate", async rol => {
  const entry = await rol.guild.fetchAuditLogs().then(audit => audit.entries.first())
    let silenk = await entry.executor;
    if (!rol.guild) return;
		const enabled = client.provider.get(rol.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(rol.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (rol.guild.channels.get(logCh) === undefined || rol.guild.channels.get(logCh) === null) return;
		if (rol.guild.channels.get(logCh).type === "text") {
    }
})
const ms = require('ms');
client.on("voiceStateUpdate", async function(e, y) {
  if(y.bot) return;
  setInterval(() => {
  if(e.voiceChannelID !== y.voiceChannelID && !e.voiceChannel) {
  if(!y.voiceChannel) return;
  const süre = client.provider.get(y.guild.id, `sesSüre${y.id}+${y.guild.id}`, []);
  const es = Number(süre);
	const süresayısı = parseInt(es) + 1000;
	client.provider.set(y.guild.id, `sesSüre${y.id}+${y.guild.id}`, süresayısı);
  client.provider.set(y.guild.id, `sesKanal${y.id}+${y.guild.id}`, y.voiceChannel.name);
  var duration = convertMS(süre)
  }
  }, 3000);  
});

client.on('presenceUpdate', (e, y) => {
  if(y.bot) return;
  setInterval(() => {
    if(y.presence.status === "online") {
    if(!y.presence.status === "online") return;
    const süre = client.provider.get(y.guild.id, `cevrimiciSüre${y.id}+${y.guild.id}`, []);
    const es = Number(süre);
	  const süresayısı = parseInt(es) + 1000;
	  client.provider.set(y.guild.id, `cevrimiciSüre${y.id}+${y.guild.id}`, süresayısı);
    }
    }, 3000);
    setInterval(() => {
    if(y.presence.status === "idle") {
    if(!y.presence.status === "idle") return;
    const süre2 = client.provider.get(y.guild.id, `bostaSüre${y.id}+${y.guild.id}`, []);
    const es2 = Number(süre2);
	  const süresayısı2 = parseInt(es2) + 1000;
    client.provider.set(y.guild.id, `bostaSüre${y.id}+${y.guild.id}`, süresayısı2);
    }
    }, 3000);
    setInterval(() => {
    if(y.presence.status === "offline") {
    if(!y.presence.status === "offline") return;
    const süre3 = client.provider.get(y.guild.id, `cevrimdisiSüre${y.id}+${y.guild.id}`, []);
    const es3 = Number(süre3);
	  const süresayısı3 = parseInt(es3) + 1000;
    client.provider.set(y.guild.id, `cevrimdisiSüre${y.id}+${y.guild.id}`, süresayısı3);
    }
    }, 3000);
    setInterval(() => {
    if(y.presence.status === "dnd") {
    if(!y.presence.status === "dnd") return;
    const süre4 = client.provider.get(y.guild.id, `mesgulSüre${y.id}+${y.guild.id}`, []);
    const es4 = Number(süre4);
	  const süresayısı4 = parseInt(es4) + 1000;
    client.provider.set(y.guild.id, `mesgulSüre${y.id}+${y.guild.id}`, süresayısı4);
    }
    }, 3000);
})
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

client.on('message', async function(msg) {
  if(msg.member.bot) return;
  if(!msg.guild) return;
   const ksayısı = client.provider.get(msg.member.guild.id, `msgKarS${msg.member.id}+${msg.member.guild.id}`, []);
   const karakter = msg.content.length;
   if(karakter < 2) return;
   const toplam = Number(ksayısı);
	 const gercek = parseInt(toplam) + karakter;
  client.provider.set(msg.member.guild.id, `msgKarS${msg.member.id}+${msg.member.guild.id}`, gercek)
});

client.on('message', async function(msg) {
  const karakter = msg.content.length;
  const ksayısı = client.provider.get(msg.member.guild.id, `msgKarSs${msg.member.id}+${msg.member.guild.id}`, []);
  if(karakter < ksayısı) return;
  client.provider.set(msg.member.guild.id, `msgKarSs${msg.member.id}+${msg.member.guild.id}`, karakter)
});

client.on("voiceStateUpdate", async(e, y) => {
  if(y.bot) return;
  if(e.voiceChannelID !== y.voiceChannelID && !e.voiceChannel) {
    let şimdikizaman = new Date().getTime();
        şimdikizaman = şimdikizaman.toFixed(0);
    console.log(şimdikizaman)
  client.provider.set(e.guild.id, `zaman1${y.user.id}+${y.guild.id}`, şimdikizaman)
  }
  if(e.voiceChannelID !== y.voiceChannelID && !y.voiceChannel) {
    const eskizaman = client.provider.get(e.guild.id, `zaman1${y.user.id}+${y.guild.id}`, []);
    const zaman2 = client.provider.get(e.guild.id, `sesToplam${y.user.id}+${y.guild.id}`, []);
    let şimdikizaman2 = new Date().getTime();
    şimdikizaman2 = şimdikizaman2.toFixed(0);
    let es = şimdikizaman2 - eskizaman;
    if(es < zaman2) return;
    client.provider.set(e.guild.id, `sesToplam${y.user.id}+${y.guild.id}`, es)
    var mesd = moment.duration(Number(es)).format('D [gün], H [saat], m [dakika], s [saniye]')
  }
});

client.on('message', async function(msg) {
  if(msg.member.bot) return;
  if(!msg.guild) return;
  
});

client.on("presenceUpdate", async (e, y) => {
  if (e.user.bot || y.user.bot) return;
  if (e.presence.status != y.presence.status) {
    if (y.presence.status == "online") {
      const zaman = new Date();
      const eskizaman = client.provider.get(y.guild.id, `cevrimiciSüreE${y.user.id}+${y.guild.id}`, []);
      let ess = zaman - eskizaman;
      if(ess < eskizaman) return;
      client.provider.set(e.guild.id, `cevrimiciSüreE${y.user.id}+${y.guild.id}`, zaman.getTime())
    }else if (e.presence.status == "online") {
      const eskizaman = client.provider.get(y.guild.id, `cevrimiciSüreE${y.user.id}+${y.guild.id}`, []);
      const zaman = new Date();
      let es = zaman.getTime() - eskizaman;
      if(es < eskizaman) return;
      client.provider.set(e.guild.id, `cevrimiciSüre${y.user.id}+${y.guild.id}`, es)
      var s = moment.duration(Number(es)).format('D [gün], H [saat], m [dakika], s [saniye]')
      console.log(s)
      console.log(es)
    }
  }
});

client.registry
	.registerDefaultTypes()
	.registerGroups([
  ['admin', 'Admin Komutları'],
	['ayarlar', 'Ayarlar Komutları'],
	['bilgi', 'Bilgi Komutları'],
	['diğer', 'Diğer Komutları'],
	['eğlence', 'Eğlence Komutları'],
  ['minecraft', 'Minecraft Komutları'],
  ['moderasyon', 'Moderasyon Komutları'],
  ['sunucu', 'Sunucu Komutları'],
  ['çerçeve', 'Çerçeve Komutları'],
  ['koruma', 'Sunucu Koruma Komutları'],
  ['müzik', 'Müzik Komutları'],
	['util', 'Util Komutları'],
  ['oda', 'Gelişmiş Oda Sistemi Komutları']
])
	.registerCommandsIn(path.join(__dirname, 'komutlar'));

sqlite.open(path.join(__dirname, "veriler.sqlite")).then((db) => {
	client.setProvider(new SQLiteProvider(db));
});

async function randomString(length, chars) {
	var mask = '';
	if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
	if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (chars.indexOf('#') > -1) mask += '0123456789';
	if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
	var result = '';
	for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
	return result;
}

client.login(process.env.TOKEN);