const commando = require('discord.js-commando');
const mcping = require('mc-ping-updated');
const now = require("performance-now");

module.exports = class McServerStatusCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mcistatistik',
            aliases: ['minecraftping', 'mcping', 'mcserverstatus', 'mss', 'mcserver', 'mci'],
            group: 'minecraft',
            memberName: 'mcistatistik',
            description: 'Sunucu IP adresi ile sunucunun durumunu görmenizi sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Minecraft sunucu IP adresi nedir?',
                    type: 'string',
					label: 'sunucu adresi',
                    min: 1,
                    max: 1000
                },
				{
                    key: 'msg2',
                    prompt: 'Minecraft sunucu portu nedir? (Genellikle 25565 olur.)',
                    type: 'integer',
					label: 'sunucu portu'
                }
            ]
        });
    }

    async run(msg, args) {
		const ip = args.msg;
		const port = args.msg2;
		const t1 = now();
		const request = require('superagent');
		request
		  .get("mcapi.us/server/status")
		  .query({ip}, {port})
		  .then(res=>{
			if (res.body.status === "error") {
				msg.channel.send(client.config.customEmojis.basarisiz + ' Sunucudan hiç bir bilgi alamadım. Hata: ', res.body.error)
			} else {
				var embed = {
					color: 3447003,
					description: `${ip}:${port} adresli sunucunun istatistikleri:`,
					fields: [
					{
						name: "❯ Sunucu durumu",
						value:  res.body.online ? 'Açık' : 'Kapalı' || "Bilgi alınamadı!",
						inline: false
					},
					{
						name: "❯ Sunucu versiyonu",
						value:  res.body.server.name.replace(/§./g,"") || "Bilgi alınamadı!",
						inline: false
					},
					{
						name: "❯ Online oyuncular",
						value: `${res.body.players.now}/${res.body.players.max}` || "Bilgi alınamadı!",
						inline: false
					},
					{
						name: "❯ Açıklama",
						value: res.body.motd.replace(/§./g,"") || "Bilgi alınamadı!",
						inline: false
					}
					],
					footer: {
						text: `İstatistikler mcapi.us sitesinden alınmaktadır.`, 
						icon: `http://img10.deviantart.net/9cc9/i/2011/008/6/1/minecraft_hd_icon___mac___pc_by_hunterkharon-d36qrs5.png`
					},
					thumbnail: {
						url: `https://mcapi.ca/query/${ip}:${port}/icon`
					},
				};
			}

			  msg.channel.send({embed});
		  });
        };
};
