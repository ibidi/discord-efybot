  
const { oneLine, stripIndents } = require('common-tags');
const { Command } = require('discord.js-commando');
const disambiguation = require('../../util/Util.js').disambiguation;

module.exports = class ReloadCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-command'],
			group: 'admin',
			memberName: 'reload',
			description: 'İstediğiniz bir komutu veya komut grubunu yeniden başlatır',
			examples: ['reload <komut adı>'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Hangi komutu veya komut grubunu yeniden başlatmak istersin?',
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
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
		args.cmdOrGrp.reload();
		if(args.cmdOrGrp.group) {
			msg.channel.send(`\`${args.cmdOrGrp.name}\` adlı komut yeniden başlatıldı.`);
		} else {
			msg.channel.send(`\`${args.cmdOrGrp.name}\` grubunun tüm komutları yeniden başlatıldı.`);
		}
		return null;
	}
};