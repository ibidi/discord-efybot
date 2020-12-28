const commando = require('discord.js-commando');
const snekfetch = require('snekfetch');

module.exports = class AchievementCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'mcbaşarım',
			group: 'minecraft',
			memberName: 'mcbaşarım',
            description: 'Minecraft başarımı yapmanızı sağlar.',
            
			args: [
				{
					key: 'text',
                    prompt: 'Başarım ne olsun?',
                    label: 'başarım',
					type: 'string',
					validate: text => {
						if (text.length < 25) return true;
						return '25 karakterden daha fazla kabul edilmez.';
					}
				}
			]
		});
	}

	async run(msg, args) {
        const { text } = args;
        
        const text1 = text
                .replace(/ö/g, 'o')
                .replace(/ç/g, 'c')
                .replace(/ş/g, 's')
                .replace(/ı/g, 'i')
                .replace(/ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/Ö/g, 'O')
                .replace(/Ç/g, 'C')
                .replace(/Ş/g, 'S')
                .replace(/İ/g, 'I')
                .replace(/Ğ/g, 'G')
                .replace(/Ü/g, 'U');

        try {
			const { body } = await snekfetch
				.get('https://www.minecraftskinstealer.com/achievement/a.php')
				.query({
					i: 1,
					h: 'Basarim kazanildi!',
					t: text1
				});
			return msg.say({ files: [{ attachment: body, name: 'basarim.png' }] });
		} catch (err) {
			return msg.say(`Opss bir hata var galiba! \`${err.message}\`. Lütfen daha sonra tekrar dene!`);
		}
	}
};

