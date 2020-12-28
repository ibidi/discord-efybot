const { Command } = require('discord.js-commando');


module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'alkışla',
			group: 'diğer',
			memberName: 'alkışla',
			description: "Belirttiğiniz mesajı alkışlar.",
			examples: ['alkışla'],
			guildOnly: false,
			guarded: false,
			args: [
				{
					key: 'text',
					prompt: 'Yazdığın 👏 yazı 👏 böyle 👏 olacaktır. 👏 Ne 👏 yazmamı 👏 istersin?',
					type: 'string',
					validate: text => {
						if (text.replace(/ /g, ' 👏 ').length < 2000) return true;
						return 'Girilen karakter çok uzun!';
					}
				}
			]
		});
	}

	async run(msg, { text }) {

		return msg.say(text.replace(/ /g, ' 👏 '));
	}
};
