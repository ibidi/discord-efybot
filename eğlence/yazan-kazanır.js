const Commando = require("discord.js-commando");
const commonTags = require("common-tags");
const util = require("util");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

const words = [
  "ateş", "vuruş", "kelime", "mikroskop", "klavye", "pilav", "kokoreç", "glynet", "discord", "bot", "tekme", "ekmek bıçağı", "sadece sen", "ahmet kural", "silah çatışması", "muvaffakiyetsizlestiricilestiriveremeyebileceklerimizdenmissinizcesine"
];1

module.exports = class GunCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "yazan-kazanır",
      group: "eğlence",
      memberName: "yazan-kazanır",
      format: "<user>",
      guildOnly: true,
                  throttling: {
                 usages: 1,
                 duration: 3,
             },
      description: "Seçtiğiniz kişi ile botun yazdığı kelimeyi ilk yazan kazanır oyununu oynarsınız.",
      details: commonTags.stripIndents`
      This command lets you and another user engage in a western gunfight.
      `,
      aliases: [
        "gunfight",
        "gun-fight",
        "gun_fight",
        "westerngunfight",
        "western-gunfight",
        "western_gunfight",
        "western-gun-fight",
        "western_gun_fight"
      ],
      examples: [
        "gun <user>",
        "gunfight <user>",
        "gun-fight <user>",
        "gun_fight <user>",
        "westerngunfight <user>",
        "western-gunfight <user>",
        "western_gunfight <user>",
        "western-gun-fight <user>",
        "western_gun_fight <user>"
      ],
      args: [
        {
          key: "opponent",
          prompt: "Kimle kapışmak istersin?",
          type: "user"
        }
      ],
      throttling: {
        usages: 1,
        duration: 5
      }
    });

    this.fighting = new Set();
  }

  wait(time) {
    return util.promisify(setTimeout)(time);
  }

  async run(msg, args) {
    const randomColor = parseInt(`0x${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
    const opponent = args.opponent;

    if (opponent.bot) {
      return msg.channel.send(msg.author, {
        embed: {
          color: randomColor,
          description: "Botlar ile kapışamazsın.",
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);
    }

    if (opponent.id === msg.author.id) {
      return msg.channel.send(msg.author, {
        embed: {
          color: randomColor,
          description: "Kendi kendine kapışmayı planlamyorsundur umarım.",
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);
    }

    if (this.fighting.has(msg.channel.id)) {
      return msg.channel.send(msg.author, {
        embed: {
          color: randomColor,
          description: "Bu kanalda zaten süren bir savaş var. Lütfen başka bir kanalda savaşın.",
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);
    }

    this.fighting.add(msg.channel.id);

    try {
			await msg.channel.send({
        embed: {
          color: randomColor,
          description: `${opponent}, kabül ediyor musun? (evet veya hayır diye cevap veriniz.)`,
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);

			const verify = await msg.channel.awaitMessages((res) => {
        return res.author.id === opponent.id;
      }, {
				max: 1,
				time: 30000
			});

			if (!verify.size || !["evet", "y"].includes(verify.first().content.toLowerCase())) {
				this.fighting.delete(msg.channel.id);

				return msg.channel.send("Hmm, sanırım reddedildi.").catch(console.error);
			}

			await msg.channel.send(":punch: Yarışmaya **Hazırlanın**!").catch(console.error);

			const length = Math.floor(Math.random() * ((30000 - 1000) + 1)) + 1000;

			await this.wait(length);

			const word = words[Math.floor(Math.random() * words.length)];

			await msg.channel.send({
        embed: {
          color: randomColor,
          description: `YAZ;\n\`${word.toLowerCase()}\``,
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);

			const filter = (res) => {
        return [opponent.id, msg.author.id].includes(res.author.id) && res.content.toLowerCase() === word;
      }

			const winner = await msg.channel.awaitMessages(filter, {
				max: 1,
				time: 30000
			});

			this.fighting.delete(msg.channel.id);

			if (!winner.size) {
        return msg.channel.send(msg.author, {
          embed: {
            color: randomColor,
            description: "Oh, sanırım kimse kazanmadı.",
            author: {
              name: this.client.user.username,
              icon_url: this.client.user.displayAvatarURL
            }
          }
        }).catch(console.error);
      }

			return msg.channel.send({
        embed: {
          color: randomColor,
          description: `Ve kazanan kişi ${winner.first().author.username}!`,
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);
		} catch (err) {
      console.log(err.stack);
			this.fighting.delete(msg.channel.id);

			return msg.channel.send(msg.author, {
        embed: {
          color: randomColor,
          //description: `Oh no, an error occurred: \`${err.message}\`. Try again later!`,
          author: {
            name: this.client.user.username,
            icon_url: this.client.user.displayAvatarURL
          }
        }
      }).catch(console.error);
		}
  }
};
