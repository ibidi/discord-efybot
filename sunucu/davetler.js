const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

const invites = {};
module.exports = class SearchDiscordBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'üye-davetleri',
			group: 'sunucu',
			memberName: 'üye-davetleri',
			description: "Sunucunun davet linklerinin kaç kişi tarafından kullanıldığını gösterir.",
			guildOnly: true,
      throttling: {
                usages: 3,
                duration: 5
            },
            args: [{
                    key: 'member',
                    prompt: 'Kimin davet ettiği üye sayısını görmek istersin?',
                    type: 'member'
                }
            ]
        });
	}

	async run(message, args) {
    const member = args.member;
    let msg = message;
    let nul = 0
        let guild = message.guild
        await guild.fetchInvites().then(invites => {
             invites.forEach(invite => {
                if (invite.inviter === this.client.users.get(member.id)) {
                     nul+=invite.uses
                } // oo reis
             })
        })
    if(nul > 0){
    msg.channel.send(member + ' isimli üyenin davet ettiği kişi sayısı **' + nul + '** ')
    } else {
      msg.channel.send('Üye hiç davet linki oluşturmamış veya davet sayısı görüntülenemiyor.')
    }
  }
}




