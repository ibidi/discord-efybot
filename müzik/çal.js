const { Command } = require('discord.js-commando')
const Discord = require('discord.js');
const Util = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyBDr8dcuW9BzgnxYlCJNPlMp14dgOsQ_qI");
module.exports = class çal extends Command {
    constructor(client) {
        super(client, {
            name: 'çal',
            aliases: ['play'],
            group: 'müzik',
            memberName: 'çall',
            description: 'Sunucunuzda müzik çalabilirsiniz.',
            examples: ['çal <şarkı adı> | çal <şarkı linki>'],

            args: [
                {
                    key: 'string',
                    label: 'string',
                    prompt: 'Hangi şarkıyı açmak istersin?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
      var queue;
      queue = global.queue
        const searchString = args.string;
	    const url = args.string ? args.string.replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
        const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(this.client.bilgiler.hayır+' Lütfen herhangi bir sesli kanala katılın.');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(this.client.bilgiler.hayır+' Bir sesli kanala bağlanmak için yeterli iznim yok.');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send(this.client.bilgiler.hayır+' Bir sesli kanalda konuşabilmek, şarkı açabilmek için yeterli iznim yok. Veya mikrofonum kapalı.');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Kuyruk Durumu: **${playlist.title}** adlı şarkı kuyruğa eklendi!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
msg.channel.send({embed: new Discord.RichEmbed()
                    .setAuthor(`${msg.author.tag} tarafından istenilen sonuçlar;`, msg.author.avatarURL)
                    .setDescription(`<:yt:651352648246755340>__**Youtube Arama Sonuçları**__
${videos.map(video2 => `**${++index}.** ${video2.title}`).join(`\n`)}

Bir şarkı seçiniz, şarkıyı seçmek için başında bulunan \`1 - 10\` arasındaki rakamlardan birisini seçiniz.
Hiç birşey yapılmadığı zaman komut \`10 saniye\` içerisinde iptal edilecektir.`)
                    .setColor(this.client.bilgiler.renk)
                     
                   }); 


    try {
      var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
        maxMatches: 1,
        time: 10000,
        errors: ['time']
      });
					} catch (err) {
						console.error(err);
						return msg.channel.send('Yanlış bir seçim yaptın veya yapmadın bu yüzden komut iptal edildi.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('Hiçbir şey bulamadım. <:hayir:561468910440939530>');
				}
			}
			return handleVideo(video, msg, voiceChannel);
}
       
    }
};

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  var queue;
      queue = global.queue
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Ups Milader sesli manala giremiyorum yha?: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Sesli kanala giremiyorum hata kodu: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
      return msg.channel.send({embed: new Discord.RichEmbed()
                                                                            .setAuthor(msg.author.tag,msg.author.avatarURL)
                                                                            .setDescription(`**Şarkı sıraya eklendi: :notes:**\n${song.title}`)
                                                                            .setTimestamp(new Date())
			.setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
    
                                    .setThumbnail(`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`)
                                                                             
                                                                            .setColor("#7289DA")
	})
  }
	return undefined;
 async function play(guild, song , skipto = undefined) {
   var queue;
      queue = this.queue
	var serverQueue = queue.get(guild.id);
	console.log(serverQueue)
	if (!song) {
		if(serverQueue.loopqueue != '')
		{
			serverQueue.songs = Object.assign([], serverQueue.loopqueue);
			song = serverQueue.songs[0]
			
		}
		else
		{
			serverQueue.voiceChannel.leave();
			queue.delete(guild.id);
			return;
		}
			

		
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url,{audioonly: true,quality:song.itag}),{bitrate:96000,passes:1})
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
      if (!serverQueue.loop)
      {

        serverQueue.songs.shift();
	  }
	  play(queue,guild, serverQueue.songs[0])
               	     
		})
		.on('error', error => console.error(error+"error:"));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Şimdi oynuyor: **${song.title}**`);
}
}
