const { Command } = require('discord.js-commando')
const Discord = require('discord.js');
const GIFEncoder = require('gifencoder');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);
const Jimp = require('jimp');
  const options = {
    size: 256,
    frames: 16
}
  
module.exports = class TriggeredCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'triggered',
			aliases: ['trigger'],
			group: 'çerçeve',
			memberName: 'triggered',
			description: 'Profil fotoğrafınıza Triggered efekti verir.',
			throttling: {
				usages: 1,
				duration: 10
			},
			args: [
				{
					key: 'member',
          label: 'user',
					prompt: 'Kimin profil fotoğrafına triggered efekti yapmak istiyorsun?\n',
					type: 'member',
				}
			]
		});
	}
	async run(msg, args) {
                                          dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
  msg.channel.send(`:mag_right: **Triggered** efekti uygulanıyor, lütfen bekleyiniz.`).then(m => m.delete(3000));
  
  var user = args.member;
      
  function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
  let avatarurl = user.user.avatarURL;
      if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => avatarurl.includes(x))) { // args.mesaj gibi mi olcak
        avatarurl = avatarurl.replace(/gif|webp/g, 'png');
      }

      const base = new Jimp(options.size, options.size);
      const avatar = await Jimp.read(avatarurl);
      const text = await Jimp.read("https://raw.githubusercontent.com/Serhann/sohbet-ve-oyun/master/commands/eglence/triggered.png");
      const tint = await Jimp.read("https://raw.githubusercontent.com/Serhann/sohbet-ve-oyun/master/commands/eglence/red.png");

      avatar.resize(320, 320);
      tint.scaleToFit(base.bitmap.width, base.bitmap.height);
      tint.opacity(0.2);
      text.scaleToFit(280, 60);

      const frames = [];
      const buffers = [];
      const encoder = new GIFEncoder(options.size, options.size);
      const stream = encoder.createReadStream();
      let temp;

      stream.on('data', async buffer => await buffers.push(buffer));
      stream.on('end', async() => {
        return await msg.channel.send({
          files: [{
            name: 'triggered.gif',
            attachment: Buffer.concat(buffers)
          }]
        });
      });

      for (let i = 0; i < options.frames; i++) {
        temp = base.clone();

        if (i === 0) {
          temp.composite(avatar, -16, -16);
        } else {
          temp.composite(avatar, -32 + getRandomInt(-16, 16), -32 + getRandomInt(-16, 16));
        }

        temp.composite(tint, 0, 0);

        if (i === 0) temp.composite(text, -10, 200);
        else temp.composite(text, -12 + getRandomInt(-8, 8), 200 + getRandomInt(-0, 12));

        frames.push(temp.bitmap.data);
        }

      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(20);
      for (const frame of frames) {
        encoder.addFrame(frame);
      }
      encoder.finish();
                                                                        }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
  };
}