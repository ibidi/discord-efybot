const { Command } = require('discord.js-commando'),
    Discord = require('discord.js');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "rol-bilgi",
            group: "sunucu",
            aliases: [],
            memberName: "rol-bilgi",
            description: "Bir rol hakkında bilgi verir.",
            examples: [`${client.commandPrefix}roleinfo <Role Name>`],
            guildOnly: true,
            args: [
                {
                    key: "role",
                    prompt: "Hangi rol hakkında bilgi almak istiyorsunuz?\n",
                    type: "role"
                }
            ]
        })
    }

    async run(message, { role }) {

        let hex = role.hexColor.toString().slice(1)
        let embed = new Discord.RichEmbed()
            .setThumbnail(`http://colorhexa.com/${hex}.png`)
            .addField("Rolün adı:", role.name, true)
            .addField(`Rol ID:`, role.id, true)
            .addField(`Rol tagı:`, role, true)
            .addField(`Etiket:`, "``" + role + "``", true)
            .addField(`Etiketlenme`, role.mentionable, true)
            .setColor(role.hexColor)
            .addField("Pozisyon:", role.position, true)
            .addField("Renk kodu:", role.hexColor, true)
            .addField("Role sahip kullanıcılar:", role.members.size, true)
            .addField(`Rolün yetkileri:`, `[Buraya tıkla!](https://discordapi.com/permissions.html#${role.permissions})`, true)
            .setFooter(`Rolün oluşturulma tarihi`)
            .setTimestamp(role.createdAt)
        message.channel.send(embed)
    }
};