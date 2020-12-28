const Commando = require("discord.js-commando");
const commonTags = require("common-tags");
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class ReverseCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "döndür",
      group: "eğlence",
      memberName: "döndür",
      format: "<text>",
      description: "Yazdığınız yazıyı döndürür.",
      details: commonTags.stripIndents`
      This command reverses text.
      `,
      aliases: [
        "esrever",
      ],
      examples: [
        "reverse <text>",
        "esrever <text>"
      ],
      args: [
        {
          key: "text",
          prompt: "Hangi yazıyı ters döndürmemi istiyorsun? Lütfen yazın.\n",
          type: "string"
        }
      ],
      throttling: {
        usages: 1,
        duration: 5
      }
    });
  }

  yaziyitersdondur(text) {
    return text.split("").reverse().join("");
  }

  run(msg, args) {
                      dbl.hasVoted(msg.author.id).then(async voted => {
      if (voted) {
    const randomColor = parseInt(`0x${(Math.random() * 0xFFFFFF << 0).toString(16)}`);

    msg.channel.send({
      embed: {
        color: 0x85cfff,
        description: this.yaziyitersdondur(args.text),
      }
    }).catch(console.error);
                              }  else {
    return msg.channel.send(`Görünüşe göre bota **oy vermemişsiniz.** Bota günlük olarak oy vermeniz **gerekmektedir!** Eğer oy verdiyseniz ve çalışmıyorsa **2-3 dakika bekleyin.** Oy linki;\nhttps://discordbots.org/bot/635442486084501534/vote`)
  }})
  }
};
