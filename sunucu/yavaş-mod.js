const Discord = require('discord.js');
const client = new Discord.Client();
const commando = require('discord.js-commando');

const ayarlar = require("../../data/ayarlar.json")

module.exports = class UtilAnnounceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yavaşmod',
            group: 'sunucu',
          			aliases: ['slowmode', 'yavaş-mod'],
            memberName: 'yavaşmod',
            description: 'Kanalda yavaş mod ayarlamanızı sağlar.',
            guildOnly: true,

            args: [
                {
                    key: 'slowmode',
                    label: 'saniye',
                    prompt: 'Yavaş mod kaç saniyeye ayarlansın? _(kapatmak için 0 yazabilirsiniz!)_\n',
                    type: 'integer'
                }
            ]
        });
    }

     hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

    async run(msg, args) {

        let channelid = msg.channel.id;
        let süre = args.slowmode;

    msg.channel.send(`:ok_hand: Yazma süresi ${süre > 3600 ? `\`${parseInt(süre/3600)}\` saat` : (süre >= 60 ? `\`${parseInt(süre/60)}\` dakika` : `\`${süre}\` saniye`)} olarak ayarlanmıştır.`)
var request = require('request');
request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: süre
    },
    headers: {
        "Authorization": `Bot ${ayarlar.TOKEN}`
    },
})};
}