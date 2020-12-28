const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ModerationKickCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reklam-taraması',
			aliases: ['reklamtaraması'],
			group: 'moderasyon',
			memberName: 'reklam-taraması',
			description: 'Sunucudaki üyelerin oynuyor kısmında reklam araması yapar.',
			details: ``,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},

		
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("KICK_MEMBERS")
	}

	async run(msg, args) {
        const members = msg.guild.members.filter(member => member.user.presence.game && /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+|.com\/.ml\/.tk)/i.test(member.user.presence.game.name));
        return msg.channel.send(members.map(member => `\`${member.id}\` ${member.displayName}`).join("\n") || ":ok_hand: Kimsenin oynuyor mesajı discord sunucusunun reklamını içermiyor.");
    }
};
