const { Command } = require('discord.js-commando');
var yazılar = new Set();
yazılar.add("evet");
yazılar.add("hayır");

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'capslock-engelle',
			aliases: ['capslockengelle'],
			group: 'ayarlar',
			memberName: 'capslock-engelle',
			description: '',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 60
			},

			args: [
                {
                    key: 'yazı',
                    label: 'değer',
                    prompt: 'CapsLock engellensin mi? (**evet** ya da **hayır** yazınız.)',
                    type: 'string',
                    validate: val => {
                        if (!yazılar.has(val)) return "Evet ya da hayır şeklinde cevap veriniz.";
                        return true;
                    }
                }
			]
		});
	}

	hasPermission(msg) {
		return msg.member.hasPermission("ADMINISTRATOR") || this.client.isOwner(msg.author)
	}

	async run(msg, args) {
        var str = args.yazı;
        const prevch = this.client.provider.get(msg.guild, 'capslock-engelle')
        if (str === "evet") {
            msg.reply(`CapsLock engelleme artık aktif!`);
            this.client.provider.set(msg.guild, 'capslock-engelle', true);
            if(prevch && prevch === true) return msg.reply(`CapsLock engelleme zaten aktif!`);
        }
        if (str === "hayır") {
            this.client.provider.set(msg.guild, 'capslock-engelle', false);
            msg.reply(`CapsLock engelleme artık de-aktif!`);
            if(prevch && prevch === false) return msg.reply(`CapsLock engelleme zaten de-aktif!`);
        }
    }
};