const commando = require('discord.js-commando');
const Discord = require("discord.js");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class EchoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sarıl',
            group: 'eğlence',
            memberName: 'sarıl',
            description: 'İstediğiniz bir kullanıcıya sarılırsınız.',
            guildOnly: true,
			throttling: {
				usages: 2,
				duration: 6
			},

            args: [
                {
                    key: 'sarıl',
                    prompt: 'Kime sarılmak istersin?\n',
                    type: 'member',
                },
                {
                    key: 'derece',
                    prompt: 'Ne kadar istekli sarılmak istersin? (1 ile 10 arasında bir rakam yazınız.)\n',
                    type: 'integer',
                    min: 0,
                    max: 10
                }
            ]
        });
    }

    async run(msg, args) {
        switch(args.derece) {
            case 1:
                msg.channel.send(`(つˆ⌣ˆ)つ  **${args.sarıl}**`)
            break;
            case 2:
                msg.channel.send(`(￣∇￣)  **${args.sarıl}**`)
            break;
            case 3:
                msg.channel.send(`(っ´▽｀)っ   **${args.sarıl}**`)
            break;
            case 4:
                msg.channel.send(`( ´∀\`) **${args.sarıl}**`)
            break;
            case 5:
                msg.channel.send(`(✿˶◕‿◕˶)  **${args.sarıl}** `)
            break;
            case 6:
                msg.channel.send(`（　＾＾  **${args.sarıl}**`)
            break;
            case 7:
                msg.channel.send(`☆-(ノﾟДﾟ) **${args.sarıl}**`)
            break;
            case 8:
                msg.channel.send(`(つ・▽・)つ **${args.sarıl}** `)
            break;
            case 9:
                msg.channel.send(`(つ≧▽≦)つ  **${args.sarıl}**  ⊂(・﹏・⊂)`)
            break;
            case 10:
                msg.channel.send(`╰ (*´︶\`*) ╯  **${args.sarıl}**  (´・ω・｀) `)
            break;
            
     }}};