const commando = require('discord.js-commando');
const { RichEmbed } = require("discord.js");

module.exports = class McAvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'mcavatar',
            aliases: ['minecraftavatar'],
            group: 'minecraft',
            memberName: 'mcavatar',
            description: 'Kullanıcı adı ile minecraft avatarı bulmanızı sağlar.',
            guildOnly: true,
            throttling: {
                 usages: 2,
                 duration: 3
             },

            args: [
                {
                    key: 'msg',
                    prompt: 'Minecraft kullanıcı adı nedir?',
                    type: 'string',
					label: 'kullanıcı adı',
                    min: 3,
                    max: 32
                }
            ]
        });
    }

    async run(msg, args) {
        const kadi = args.msg;
        var embed = new RichEmbed()
        .setTitle(`**${kadi}** adlı kullanıcının avatarı:`)
        .setImage(`https://cravatar.eu/avatar/${kadi}/100.png`)
        .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
        .setColor('RANDOM');
		msg.channel.send({embed});
	};
};
