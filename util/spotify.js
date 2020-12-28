const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class GirişÇıkışBelirle extends Command {
    constructor(client) {
        super(client, {
            name: 'spotify',
            aliases: [],
            group: 'util',
            memberName: 'spotify',
            description: 'Spotify üzerinden dinlenilen şarkının bilgilerini gösterir.',
            args: [
                {
                    key: 'user',
                  	label: 'user',
                    prompt: 'Kimin Spotify şarkısı hakkında bilgi almak istersin?',
                    type: 'member'
                }
            ]
        });    
    }

    
    async run(message, args) {
          var user = message.mentions.users.first() || message.author;  
    if (user.presence.game.name === 'Spotify' && user.presence.game.type === 2) {
        try {
            var trackImg = user.presence.game.assets.largeImageURL;
            var trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
            var trackName = user.presence.game.details;
            var trackAlbum = user.presence.game.assets.largeText;
            var trackAuthor = user.presence.game.state;
            const embed = new Discord.RichEmbed()
                .setAuthor('Spotify', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2000px-Spotify_logo_without_text.svg.png')
                .setColor(0xdb954) // spotify color: 0xdb954 - normal embed color: this.client.bilgiler.renk
                .setThumbnail(trackImg)
                .addField('Şarkı', `${trackName}`, true)
                .addField('Albüm', `${trackAlbum}`, true)
                .addField('Sanatçı', `${trackAuthor}`, true)
                .addField('Bağlantı:', `**[Buraya tıkla!](${trackUrl})**`, false)
                .addField('Dinleyen', `${message.author}`,false);
            return message.channel.send(embed);
        } catch (error) {
            return message.channel.send(this.client.bilgiler.hayir+` **${user.tag}** kullanıcısı şu anda Spotify'da şarkı dinlemiyor!`);
        }
    } else {
        return message.channel.send(this.client.bilgiler.hayir+` **${user.tag}** kullanıcısı şu anda Discord hesabına Spotify hesabını eklememiş!`);
    }
};
}