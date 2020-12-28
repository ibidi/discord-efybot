const { Command } = require('discord.js-commando');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'toplu-rol-ver',
            group: 'sunucu',
            memberName: 'toplu-rol-ver',
            description: 'Vermek istediğiniz rolü sunucuda bulunan tüm üyelere verir. **YENI**',
            guildOnly: true,
						throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'role',
                    prompt: 'Herkese vereceğin rolün adını yaz!',
                    type: 'role'
                }
            ]
        });
    }

    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_ROLES');
    }
    
    async run(message, args) {
              const { member, role } = args;

  message.channel.send(":ok_hand: Sunucudaki herkese `" + role.name + "` olarak belirlediğiniz rol veriliyor. *(bot herkese rol vermediyse eğer tekrardan aynı komutu deneyebilirsiniz.)*")
  
  var rol = message.guild.roles.get(role.id);
  
  try {
    message.guild.members.forEach(async (user, id) => {
     user.addRole(rol)
  });
  } catch(e){
      console.log(e.stack);
  }
  
};
}