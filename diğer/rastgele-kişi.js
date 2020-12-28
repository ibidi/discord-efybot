const { Command } = require('discord.js-commando');


module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rastgele-kişi',
			group: 'diğer',
			memberName: 'rastgele-kişi',
			description: "Sunucuda bulunan kişilerden rastgele bir kişiyi gösterir.",
			examples: ['rastgele-kişi'],
			guildOnly: false,
			guarded: false,
		});
	}

	async run(msg, { text }) {
		if (msg.channel.type === 'dm') {
			const members = [this.client.user, msg.channel.recipient];
			return msg.say(`**Seçilen kullanıcı:** \`${members[Math.floor(Math.random() * members.length)].username}!\``);
		}
		return msg.say(`**Seçilen kullanıcı:** \`${msg.guild.members.random().displayName}!\``);
	}
};


