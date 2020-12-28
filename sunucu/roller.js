const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class EmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roller',
            group: 'sunucu',
            memberName: 'roller',
            description: 'Bulunduğunuz sunucudaki rolleri listeler.',
        });    
    }

    run(msg) {

            const embed = new RichEmbed()
            .setColor("RANDOM")
            .setAuthor(msg.guild.name, msg.guild.iconURL)
               .addField('Varsayılan rol:', msg.guild.defaultRole, true)
            .setTitle(`Roller [${msg.guild.roles.size}]`)
            .setDescription(`<@&${msg.guild.roles.map(role => `${role.id}`).join('>, <@&')}>`)
            return msg.embed(embed)
        }
};