const { Command } = require('discord.js-commando');

module.exports = class spanel extends Command {
    constructor(client) {
        super(client, {
            name: 'sunucu-panel',
            group: 'ayarlar',
            memberName: 'sunucu-panel',
            description: 'Ses kanalı olarak sunucu istatistiklerini listeler.',
            guildOnly: true
        });
    }

    hasPermission(msg) {
        if (!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author)
    }

    async run(message, args) {
        const msg = message;
        let rdnd1 = msg.guild.members.filter(m => m.user.presence.status == "online" || m.user.presence.status == "dnd" || m.user.presence.status == "idle").size
        const vt = this.client.provider.get(message.guild.id, 'sunucupanel', []);
        //if(vt === true) return msg.say('Sunucu paneli zaten var!')
        this.client.provider.set(message.guild.id, 'sunucupanel', true);
        this.client.provider.set(message.guild.id, 'sunucupanelg', msg.guild.id);
        msg.guild.createChannel("Sunucu Paneli", "category").then(c => {
          c.setPosition(0)
        })
        const k = msg.guild.channels.find(c => c.name == "Sunucu Paneli")
        message.guild.createChannel('Üye Sayısı: ' + message.guild.members.size, "voice", [{
  id: message.guild.id,
  deny: ['CONNECT']
}])
          .then(c => {
          this.client.provider.set(message.guild.id, 'skanalı', c.id)
          c.setParent(msg.guild.channels.find(c => c.name == "Sunucu Paneli" && c.type == "category"))
        });
        message.guild.createChannel('Rekor Çevrimiçi: ' + rdnd1, "voice", [{
        id: message.guild.id,
        deny: ['CONNECT']
        }])
          .then(c2 => {
          this.client.provider.set(message.guild.id, 'skanalı2', c2.id)
          c2.setParent(msg.guild.channels.find(c => c.name == "Sunucu Paneli" && c.type == "category"))
        });
        message.guild.createChannel('Rol Sayısı: ' + msg.guild.roles.size.toLocaleString(), "voice", [{
        id: message.guild.id,
        deny: ['CONNECT']
        }])
          .then(c3 => {
          this.client.provider.set(message.guild.id, 'skanalı3', c3.id)
          c3.setParent(msg.guild.channels.find(c => c.name == "Sunucu Paneli" && c.type == "category"))
        });
      const knlss = message.guild.channels.size;
       return message.guild.createChannel(`Kanal sayısı: ${message.guild.channels.size}`, "voice", [{
        id: message.guild.id,
        deny: ['CONNECT']
        }])
          .then(c4 => {
          this.client.provider.set(message.guild.id, 'skanalı4', c4.id)
          c4.setParent(msg.guild.channels.find(c => c.name == "Sunucu Paneli" && c.type == "category"))
        });
        message.channel.send(`:ok_hand: Sunucu paneli başarıyla aktif edildi!`);
        msg.guild.channels.get(msg.guild.settings.get('skanalı')).setName('Üye Sayısı: ' + message.guild.members.size)
        msg.guild.channels.get(msg.guild.settings.get('skanalı2')).setName('Rekor Çevrimiçi: ' + rdnd1)
        msg.guild.channels.get(msg.guild.settings.get('skanalı3')).setName('Rol Sayısı: ' + msg.guild.roles.size)
        msg.guild.channels.get(msg.guild.settings.get('skanalı4')).setName(`Kanal sayısı: ${message.guild.channels.size}`)
    }
};
