const commando = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class McSkinCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: "mcskin",
			aliases: ["minecraftskin"],
			group: "minecraft",
			memberName: "mcskin",
			description: "Kullanıcı adı ile minecraft skini bulmanızı sağlar.",
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			},
			args: [
				{
					key: "msg",
					prompt: "Minecraft kullanıcı adı nedir?",
					type: "string",
					label: "kullanıcı adı",
					min: 3,
					max: 32
				}
			]
		});
	}

	async run(msg, args) {
        const kadi = args.msg;
        var embed = new RichEmbed()
        .setTitle(`**${kadi}** adlı kullanıcının skini:`)
        .setImage(`https://minotar.net/armor/body/${kadi}/300.png`)
        .setFooter(`${msg.author.tag} tarafından istendi.`, msg.author.avatarURL)
        .setColor('RANDOM');
		return msg.channel.send({embed});
	};
};