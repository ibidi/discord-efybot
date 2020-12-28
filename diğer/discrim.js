const { Command } = require('discord.js-commando');
const { trimArray } = require('../../util/Util');
const { stripIndents } = require('common-tags');


module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'discrim',
			group: 'diğer',
			memberName: 'discrim',
			description: "Belirttiğiniz discrimi botun bulunduğu sunucular üzerinden arar.",
			guildOnly: false,
			guarded: false,
args: [
				{
					key: 'discrim',
					label: 'discriminator',
					prompt: 'Hangi discrimi aramak istersiniz? _(not: bot bulunduğu sunucularda olan kişilerin discrimini arayabilir.)_\n',
					type: 'string',
					validate: discrim => {
						if (/^[0-9]+$/.test(discrim) && discrim.length === 4) return true;
						return 'Discrim hatalı.';
					}
				}
			]
		});
	}

	async run(msg, { discrim }) {

    const users = this.client.users.filter(user => user.discriminator === discrim).map(user => user.username);
		return msg.say(stripIndents`
			**#${discrim} bu discrimli ${users.length} kullanıcı bulundu:**
			${trimArray(users, 50).join(', ')}
		`);
	}
};



