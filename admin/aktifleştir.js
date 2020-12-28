const { oneLine, stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando');
const disambiguation = require('../../util/Util.js').disambiguation;

module.exports = class EnableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'aktifleştir',
			aliases: ['enable-command', 'cmd-on', 'command-on'],
			group: 'admin',
			memberName: 'enable',
			description: 'Devre dışı bırakılan komutu veya komut grubunu aktifleştirir.',
			examples: ['aktifleştir util', 'aktifleştir Utility', 'aktifleştir prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Hangi komutu veya komut grubunu aktifleştirmek istersiniz?',
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
			return msg.member.hasPermission('ADMINISTRATOR');
	}

	async run(msg, args) {
		if(args.cmdOrGrp.isEnabledIn(msg.guild)) {
			return msg.channel.send(
				`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} zaten etkin.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, true);
		return msg.channel.send(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'komutu' : 'grubu'} ektinleştirildi.`);
	}
};