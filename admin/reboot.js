const {Command} = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ShutdownCommand extends Command {
    constructor(client){
        super(client, {
            name: "reboot",
            memberName: 'reboot',
            group: 'admin',
            ownerOnly: true,
            description: "Botu yeniden başlatır. Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.",
            aliases: ["st", "die"],
            examples: [`efy!reboot`]
        })
    }
  	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}
    async run(message) {
       message.say(`peki **${message.author.username}** yeniden başlıyorum :wave:`)
        await message.react("✅");
        process.exit(1)
    }
}