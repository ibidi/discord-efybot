const { Command } = require('discord.js-commando');
const invites = {} //invites ile alakalı
const _ = require('lodash');

module.exports = class BlacklistUserCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'destek-sistemi-ayarla',
            aliases: ['desteksistemiayarla'],
            group: 'oda',
            memberName: 'destek-sistemi-ayarla',
            description: '',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60
            },

            args: [{
                    key: 'kanal',
                    prompt: 'Destek sistemini hangi kanal ayarlamak istiyorsunuz?\n',
                    type: 'channel',
                },
                {
                    key: 'kategori',
                    prompt: 'Destek sistemindeki talepler hangi kategorinin altında açılsın?\n',
                    type: 'channel',
                },
                {
                    key: 'rol1',
                    prompt: 'Destek ekibi olarak ayarlanacak olan rol hangisi olmalıdır?\n',
                    type: 'role',
                }
            ]
        });
    }
    hasPermission(msg) {
        return msg.member.hasPermission("ADMINISTRATOR") || this.client.isOwner(msg.author)
    }
    async run(message, args) {
        let kod = args.kategori;
        let kanal = args.kanal;
        let ac = args.rol1
        let drole = message.guild.roles.find(role => role.id === ac.id);
        let category = message.guild.channels.find(channel => channel.id === kod.id);
        let gRole = message.guild.channels.find(channel => channel.id === kanal.id); // rol çekme
        if (!gRole) return message.reply("Kanalı bulamadım.");
        let data1 = this.client.provider.get(message.guild.id, 'desteksistemi', []);
        if (data1) {
            if (_.find(data1, {
                    "kanal": gRole.id
                })) return message.reply(`${gRole.id} mesajında zaten bir tane tepki sistemi oluşturulmuş.`);
            let cmd = {
                'kanal': gRole.id,
                'kategori': category.id,
                'rol': drole.id
            };
            data1.push(cmd);
            this.client.provider.set(message.guild.id, "desteksistemi", data1);
        } else {
            let data1 = [{
                'kanal': gRole.id,
                'kategori': category.id,
                'rol': drole.id
            }]
            this.client.provider.set(message.guild.id, "desteksistemi", data1);
        }
        message.channel.send(`Destek sistemi \`kategori :${kod.name} kanal ismi: ${gRole.name} destek ekibi rolü: ${ac.name}\` şeklinde ayarlandı.`)
    }
}