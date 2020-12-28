const { stripIndents, oneLine } = require('common-tags');
const {Command} = require('discord.js-commando');
// bi hata var mı?
module.exports = class PrefixCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ön-ek',
            aliases: ['prefix'],
            group: 'sunucu',
            memberName: 'ön-ek',
            description: 'Botun ön-ek ini sunucunuza göre ayarlarsınız',
            format: '[ön-ek/"normal"/"yok"]',
            details: oneLine`
				Ön-ek bulunamaz ise efy! olarak gösterilir.
				Ön-ek değiştirilmemiş ise botun standart ön-ek'i gösterilir.
				Ön-ek bilinmiyor ise sadece komutlar için geçerli olur.
				Ön-ek'i sadece **Yönetici** veya **Sunucuyu Yönet** yetkisine sahip üyeler kullanabilir.
			`,
            examples: ['ön-ek', 'ön-ek -', 'ön-ek efy!', 'ön-ek normal'],

            args: [
                {
                    key: 'prefix',
                    prompt: 'Yeni ön-ek inin ne olmasını istersin??',
                    type: 'string'
                }
            ]
        });
    }
    async run(msg, args) {
        if (!args.prefix) {
            const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
            return msg.reply(stripIndents`
				${prefix ? `Komutun ön-ek'i \`${prefix}\`.` : 'Komutlar ön-ek olarak kullanılamaz.'}
				Komut kullanımı için: ${msg.anyUsage('command')}.
			`);
        }

        if (msg.guild) {
            if (!msg.member.hasPermission("MANAGE_GUILD" && "ADMINISTRATOR") && !this.client.isOwner(msg.author)) {
                return msg.reply('Ön-ek\'i sadece `Yönetici` veya `Sunucuyu Yönet` yetkisi olanlar kullanabilir!');
            }
        } else if (!this.client.isOwner(msg.author)) {
            return msg.reply('Genel ön-ek\'i sadece bot sahibi değiştirebilir!');
        }

        const lowercase = args.prefix.toLowerCase();
        const prefix = lowercase === 'yok' ? '' : args.prefix;
        let response;
        if (lowercase === 'normal') {
            if (msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
            const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'no prefix';
            response = `Ön-ek varsayılan olarak ayarlandı (sabit ${current}).`;
        } else {
            if (msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
            response = prefix ? `Ön-ek \`${args.prefix}\` olarak ayarlandı.` : 'Ön-ek tamamen kaldırıldı.';
        }

        await msg.reply(`${response} Komut çalıştırmak için ${msg.anyUsage('command')}.`);
        return null;
    }
};