const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');
const twemoji = require("twemoji")

module.exports = class EmojiCreateCommand extends Command {
    constructor(client) {
        super(client, {
            name: "jumbo",
            memberName: "jumbo",
            description: "Girilen emojinin büyük halini gösterir. **YENI**",
            group: "eğlence",
            examples: [`${client.commandPrefix}createemoji <Link Here> <Name Here>`],
            guildOnly: true,
            userPermissions: ["MANAGE_EMOJIS"],
            aliases: [],
            args: [
                {
                    key: 'ImageURL',
                    prompt: `Büyük hale getirmek/büyütmek istediğiniz emojiyi giriniz.`,
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { ImageURL }) {
   try {
    const emote = Discord.Util.parseEmoji(ImageURL)
    if (emote.animated === true) {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif`
      await message.channel.send({ files: [{ attachment: URL, name: emote.name+'.gif' }] })
    } else if (emote.id === null) {
      const twemote = twemoji.parse(ImageURL)
      const regex = /src="(.+)"/g
      const regTwemote = regex.exec(twemote)[1]
      await message.channel.send({ files: [{ attachment: regTwemote, name: 'emoji.png' }] })
    } else {
      const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`
      await message.channel.send({ files: [{ attachment: URL, name: emote.name+'.png' }] })
    }
 } catch (error) {
   return console.log(error.message)
  }
}
}