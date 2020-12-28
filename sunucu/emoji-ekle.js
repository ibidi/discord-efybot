const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
module.exports = class EmojiCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "emoji-yükle",
            memberName: "emoji-yükle",
            description: "Sunucuya emoji eklersiniz.",
            group: "sunucu",
            examples: [`${client.commandPrefix}createemoji <Link Here> <Name Here>`],
            guildOnly: true,
            userPermissions: ["MANAGE_EMOJIS"],
            aliases: ['emoji-ekle'],
            args: [
                {
                    key: 'ImageURL',
                    prompt: `Sunucuya eklememi istediğin emojinin URL'sini yazınız. *(emojinin boyutu 256kb'den büyük olmamalıdır.)*`,
                    type: 'string'
                },
                {
                    key: "name",
                    prompt: "Lütfen eklemiş olduğun emojinin ismini gir.",
                    type: "string"
                }
            ]
        })
    }
    async run(message, { ImageURL, name }) {
        let link = ImageURL,
            emojiname = name;
        message.guild.createEmoji(link, emojiname)
            .then(emoji => {
                message.channel.send(`:ok_hand: **${emoji.name}** adlı emoji \`(\`${emoji}\`)\` başarılı bir şekilde sunucuya eklenmiştir. \n ${emoji.url}`)
            }).catch(error => {
                message.say("Emojinin boyutu 256KB'tan büyük olduğu için yükleyemedim!")
            });
    }
}