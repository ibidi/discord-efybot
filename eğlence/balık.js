const { Command } = require('discord.js-commando');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const fishes = [':fish:', ':tropical_fish:', ':blowfish:', ':wrench:'];

module.exports = class FishyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'balık',
            group: 'eğlence',
            memberName: 'balık',
                      throttling: {
                 usages: 1,
                 duration: 3,
             },
            description: 'Balık yakalarsınız.'
          
        });
    }

    run(msg) {
                  dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
        const fish = fishes[Math.floor(Math.random() * fishes.length)];
        return msg.say(`Bunu yakaladın: ${fish}`);
                      }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
    }
};