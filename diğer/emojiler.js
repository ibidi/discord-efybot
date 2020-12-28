const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client,
            {
                name: "emojiler",
                memberName: "emojiler",
                group: "diğer",
                description: "Sunucuda bulunan emojileri gösterir.",
                examples: [`${client.commandPrefix}emojis`],
                guildOnly: true,
                aliases: ["emoji"]
            });
    }
    async run(msg) {
        let animEmotes = [],
            staticEmotes = [];

        msg.guild.emojis.forEach((e) => {
            e.animated ? animEmotes.push(`<a:${e.name}:${e.id}>`) : staticEmotes.push(`<:${e.name}:${e.id}>`);
        });
        staticEmotes = staticEmotes.length !== 0 ? `__**[${staticEmotes.length}] Normal Emojiler**__\n${staticEmotes.join('')}` : '';
        animEmotes = animEmotes.length !== 0 ? `\n\n__**[${animEmotes.length}] Hareketli Emojiler**__\n${animEmotes.join('')}` : '';
        let botembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(staticEmotes + animEmotes)
            .setAuthor(`${msg.guild.name} Sunucusunun Emojileri`, msg.guild.iconURL)
            .setTimestamp()
        msg.embed(botembed)
    }
}