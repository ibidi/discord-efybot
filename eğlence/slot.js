const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class SlotsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'slot',
            aliases: [],
            group: 'eğlence',
            memberName: 'slot',
            description: 'Slot mankinesi ile oynarsınız.',
            guildOnly: true,
            throttling: {
                 usages: 1,
                 duration: 3,
             },
        });
    }

	run(msg) {
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {
			return msg.say(stripIndents`
				${slotOne}|${slotTwo}|${slotThree}
				Wow! Tebrikler oyunu kazandın!
			`);
		}
		return msg.say(stripIndents`
			${slotOne}|${slotTwo}|${slotThree}
			Ne! Şansızsın dostum maalesef oyunu kaybettin!
		`);
	}
};