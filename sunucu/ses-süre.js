const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { Pool } = require ('pg'); 

module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ses',
			group: 'sunucu',
			memberName: 'ses',
			description: "Sunucunun davet linklerinin kaç kişi tarafından kullanıldığını gösterir.",
			guildOnly: true,
      throttling: {
                usages: 3,
                duration: 5
            },
            args: [{
                    key: 'member',
                    prompt: 'Bir üye seç',
                    type: 'member'
                }
            ]
        });
	}

	async run(msg, args) {
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function timeStringFunction(num){
        let totalTime = num;
        let totalDays = Math.floor(totalTime / 86400);
        totalTime = totalTime % 86400;

        let totalHours = Math.floor(totalTime / 3600);
        totalTime = totalTime % 3600;

        let totalMinutes = Math.floor(totalTime / 60);
        totalTime = totalTime % 60;

        let totalSeconds = totalTime;

        totalDays = totalDays.toFixed(0);
        totalSeconds = totalSeconds.toFixed(0);
        totalMinutes = totalMinutes.toFixed(0);
        totalHours = totalHours.toFixed(0);

        totalDays = numberWithCommas(totalDays);

        let timeString = (totalDays != "0" && totalDays != "1" ? `${totalDays} Days ` : '' || totalDays == "1" ? `${totalDays} Day ` : '') +
                            (totalHours > 1 ? `${totalHours} Hours ` : '' || totalHours == 1 ? `${totalHours} Hour ` : '') +
                            (totalMinutes > 1 ? `${totalMinutes} Minutes ` : '' || totalMinutes == 1 ? `${totalMinutes} Minute ` : '') +
                            (totalSeconds > 1 ? `${totalSeconds} Seconds` : '' || totalSeconds == 1 ? `${totalSeconds} Second` : '');
        
        return timeString;

}
    let botQueryText2 = `SELECT * FROM xp WHERE (id != 'botstats') ORDER BY voicetime DESC LIMIT 10`;

        pool.query(botQueryText2, (err, results) =>{
          msg.channel.send(`:first_place: ${msg.client.users.get(`${results.rows[0].id}`).username}`, `**Voice Time: ** \`${timeStringFunction(results.rows[0].voicetime)}\``)
            if (err) throw err;
        });
  }
}