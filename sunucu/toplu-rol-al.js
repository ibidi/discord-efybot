const { Command } = require('discord.js-commando');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'toplu-rol-al',
            group: 'sunucu',
            memberName: 'toplu-rol-al',
            description: 'Almak istediğiniz rolü sunucuda bulunan tüm üyelerden alır. **YENI**',
            guildOnly: true,
						throttling: {
                usages: 3,
                duration: 5
            },
            args: [
                {
                    key: 'role',
                    prompt: 'Herkesten alacağın rolün adını yaz!',
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

  message.channel.send(":ok_hand: Sunucudaki herkesten `" + role.name + "` olarak belirlediğiniz rol alınıyor. *(bot herkesin rolünü almadıysa eğer tekrardan aynı komutu deneyebilirsiniz.)*")
  
  var rol = message.guild.roles.get(role.id);
  
  try {
    message.guild.members.forEach(async (user, id) => {
     user.removeRole(rol)
  });
  } catch(e){
      console.log(e.stack);
  }
  
 /* if ("s") {
    message.channel.send("Sunucudaki herkesten başarıyla `" + role.name + "` adlı rol alındı!")
  };*/
  
};
}