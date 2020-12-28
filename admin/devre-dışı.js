const { oneLine, stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando');
const disambiguation = require('../../util/Util.js').disambiguation;

module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'devre-dışı',
			aliases: ['disable-command', 'cmd-off', 'command-off'],
			group: 'admin',
			memberName: 'devre-dışı',
			description: 'Bir komutu veya komut grubunu devre dışı bırakır.',
			examples: ['devre-dışı util', 'devre-dışı Utility', 'devre-dışı prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Hangi komutu veya komut grubunu devre dışı bırmak istersiniz?',
					validate: val => {
						if(!val) return false;
						const groups = this.client.registry.findGroups(val);
						if(groups.length === 1) return true;
						const commands = this.client.registry.findCommands(val);
						if(commands.length === 1) return true;
						if(commands.length === 0 && groups.length === 0) return false;
						return stripIndents`
							${commands.length > 1 ? disambiguation(commands, 'commands') : ''}
							${groups.length > 1 ? disambiguation(groups, 'groups') : ''}
						`;
					},
					parse: val => this.client.registry.findGroups(val)[0] || this.client.registry.findCommands(val)[0]
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
	}

	async run(msg, args) {
		if(!args.cmdOrGrp.isEnabledIn(msg.guild)) {
			return msg.chanel.send(
				`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} zaten devre dışı.`
			);
		}
		if(args.cmdOrGrp.guarded) {
			return msg.channel.send(
				` Bunu devre dışı bırakamazsın: \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komut' : 'grup'}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, false);
		return msg.channel.send(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} devre dışı bırakıldı.`);
	}
};