const commando = require('discord.js-commando');
const Discord = require("discord.js");
const client = new commando.Client;
const fs = require("fs");

module.exports = class LockdownCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'kanalı-kilitle',
            group: 'moderasyon',
            memberName: 'kanalı-kilitle',
            description: "Komutu kullandığınız kanalı kilitleyip/açmanıza yarar.",
            examples: ['kanalıkilitle'],
            guildOnly: true,
            args: [
                {
                    key: "bool",
                    prompt: "Kilitlemek için `kilitle` \nKilidi açmak için `kilitaç`",
                    type: 'string'
                }
            ]
        });
    }

    run(msg, { bool }) {

        if (bool == "kilitle") {
            msg.channel.overwritePermissions(msg.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                msg.channel.send(":lock: `Kanal kilitlendi.`")
            });
        } else if (bool == "kilitaç") {
            msg.channel.overwritePermissions(msg.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                msg.channel.send(":unlock: `Kilit kaldırıldı.`")
            });
        }
    }
};