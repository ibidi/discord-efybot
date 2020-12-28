const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
    const fetch = require('node-fetch');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wiki",
            memberName: "wiki",
            aliases: ["wikipedia"],
            examples: ["efy!wiki McDonalds"],
            description: "Wikipedia üzerinden birşeyleri aramanızı sağlar.",
            group: "util",
            args: [
                {
                    key: 'content',
                    prompt: 'Neyi wikipedia üzerinden aramak istiyorsun?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        const article = await fetch(`https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(content)}`)
            .then(response => response.json())
            .catch(() => { message.say(`Can't find anything with that name.`) });
        if(article.title === "Not found.") return message.say(`:lock: Hiç bir sonuca ulaşamadım.`)
        const embed = new Discord.RichEmbed()
            .setColor(4886754)
            .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
            .setURL(article.content_urls.desktop.page)
            .setTitle(article.title)
            .setDescription(`**${article.description}**\n\n${article.extract}`)
            .addField(`Yazıldığı tarih:`, article.timestamp, true)
            .addField(`Link:`, `[Buraya tıkla!](${article.content_urls.desktop.page})`, true)
            .setTimestamp()
            .setFooter(`Bu bilgiler ${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL)
            .setAuthor(`Wikipedia`, `https://i.imgur.com/fnhlGh5.png`)

        message.embed(embed);
    }
}