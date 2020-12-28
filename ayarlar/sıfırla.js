const { Command } = require('discord.js-commando');
const grups = ['anons-kanalı', 'giriş-mesaj', 'giriş-rolü', 'giriş-çıkış', 'kullanıcı-log', 'log', 'mod-log', 'resimli-giriş-çıkış', 'sayaç', 'sayaç-kanal', 'çıkış-mesaj', 'başvuru-kanalı'];

module.exports = class ModChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sıfırla',
            group: 'ayarlar',
            memberName: 'sıfırla',
            description: 'Sunucuda yaptığınız bir ayarı sıfırlamaya sağlar.',
            guildOnly: true,
          args: [
        {
          key: 'ayar',
          prompt: 'Sıfırlamak istediğiniz ayarı yazınız. _(anons-kanalı, giriş-mesaj, giriş-rolü, giriş-çıkış, kullanıcı-log, log, mod-log, resimli-giriş-çıkış, sayaç, sayaç-kanal, çıkış-mesaj, başvuru-kanalı)_',
          type: 'string',
        }
      ]
        })}
    
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission("MANAGE_GUILD");
    }

    async run(message, args) {
      {
          
        if(args.ayar === "anons-kanalı") {
        message.guild.settings.remove('anonsKanal');
        return message.channel.send(`:ok_hand: Anons kanalı başarılı bir şekilde sıfırlandı.`);
          
        } else {
          
        if(args.ayar === "giriş-mesaj") {
        message.guild.settings.remove('girisMesaj');
        return message.channel.send(`:ok_hand: Giriş mesajı başarılı bir şekilde sıfırlandı.`);
        
        } else {
                  
        if(args.ayar === "giriş-rolü") {
        message.guild.settings.remove('girisRol');
        return message.channel.send(`:ok_hand: Giriş rolü başarılı bir şekilde sıfırlandı.`);
          
        } else {
          
        if(args.ayar === "giriş-çıkış") {
        message.guild.settings.remove('girisCikis');
        return message.channel.send(`:ok_hand: Giriş çıkış kanalı başarılı bir şekilde sıfırlandı.`);
            
        } else {
          
        if(args.ayar === "kullanıcı-log") {
        message.guild.settings.remove('userLogsChannel');
        return message.channel.send(`:ok_hand: Kullanıcı Log kanalı başarılı bir şekilde sıfırlandı.`);
                  
        } else {
          
        if(args.ayar === "log") {
        message.guild.settings.remove('logsChannel');
        return message.channel.send(`:ok_hand: Log kanalı başarılı bir şekilde sıfırlandı.`);
            
        } else {
          
        if(args.ayar === "mod-log") {
        message.guild.settings.remove('modLog');
        return message.channel.send(`:ok_hand: Mod-log kanalı başarılı bir şekilde sıfırlandı.`);
          
        } else {
          
        if(args.ayar === "resimli-giriş-çıkış") {
        message.guild.settings.remove('girisCikisK');
        return message.channel.send(`:ok_hand: Resimli giriş çıkış kanalı başarılı bir şekilde sıfırlandı.`);
          
        } else {

        if(args.ayar === "sayaç") {
        message.guild.settings.remove('sayacSayi');
        return message.channel.send(`:ok_hand: Sayaç sayısı başarılı bir şekilde sıfırlandı.`);
          
        } else {
          
       if(args.ayar === "sayaç-kanal") {
        message.guild.settings.remove('sayacKanal');
        return message.channel.send(`:ok_hand: Sayaç kanalı başarılı bir şekilde sıfırlandı.`);
          
        } else {
        
        if(args.ayar === "çıkış-mesaj") {
        message.guild.settings.remove('cikisMesaj');
        return message.channel.send(`:ok_hand: Çıkış mesajı başarılı bir şekilde sıfırlandı.`);
            
        } else {
          
        if(args.ayar === "başvuru-kanalı") {
        message.guild.settings.remove('başvuruKanal');
        return message.channel.send(`:ok_hand: Başvuru kanalı başarılı bir şekilde sıfırlandı.`);

        }
        }
        }
        }
        }
        }
        }
        }
        }
        }
      }
        }
      }
    }
};