const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client,
            {
                name: "espiri",
                memberName: "espiri",
                group: "eğlence",
                description: "Bot espiri/espiriler yapar.",
                examples: [`${client.commandPrefix}emojis`],
                guildOnly: true,
                aliases: []
            });
    }
    async run(msg) {
  
  var request = require('request');
  request('https://apiler.glitch.me/api/espri', function (error, response, body) {
    if (error) return console.log('Hata:', error);
    else if (!error) { 
      var api = JSON.parse(body);
      msg.channel.send(`${api.espri}`)
    }
  })
};
}