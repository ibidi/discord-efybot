const Commando = require("discord.js-commando");
const commonTags = require("common-tags");
const Discord = require("discord.js")
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTQ0MjQ4NjA4NDUwMTUzNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTc1MTQ1ODMzfQ.SKFSeD-EcAdmPXYYA3JWLgKdv1GL_8p-iLgFsxEBu9k', this.client);

module.exports = class TicTacToeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: "xox",
			group: "eğlence",
			memberName: "xox",
			description: "XOX oyununu oynarsınız.",
			args: [
				{
					key: "opponent",
					prompt: "Kiminle bu oyunu oynamak istersin?\n",
					type: "user",
					default: ""
				}
			]
		});

		this.playing = new Set();
	}

	async run(msg, args) {
		const randomColor = parseInt(`0x${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
		const opponent = args.opponent || this.client.user;

		if (opponent.id === msg.author.id) {
			return msg.channel.send(msg.author, {
				embed: {
					color: randomColor,
					description: "Kendinize karşı oynamayabilirsiniz.",
					author: {
						name: this.client.user.username,
						icon_url: this.client.user.displayAvatarURL
					}
				}
			}).catch(console.error);
		}

		if (this.playing.has(msg.channel.id)) {
			return msg.channel.send(msg.author, {
			  embed: {
				  color: randomColor,
				  description: "Kanal başına yalnızca bir oyun olabilir.",
				  author: {
					  name: this.client.user.username,
					  icon_url: this.client.user.displayAvatarURL
				  }
			  }
		  }).catch(console.error);
	  }

		this.playing.add(msg.channel.id);

		try {
			if (!opponent.bot) {
				await msg.channel.send(opponent, {
				  embed: {
					  color: randomColor,
					  description: `${opponent} kabül ediyormusun?`,
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
					this.playing.delete(msg.channel.id);

					return msg.channel.send(msg.author, {
					  embed: {
						  color: randomColor,
						  description: "Reddetti gibi görünüyor...",
						  author: {
							  name: this.client.user.username,
							  icon_url: this.client.user.displayAvatarURL
						  }
					  }
				  }).catch(console.error);
				}
			}

			const sides = [
				"0", "1", "2", "3", "4", "5", "6", "7", "8"
			];

			const taken = [];
			var userTurn = true;
			var winner = null;

			while (!winner && taken.length < 9) {
				const user = userTurn ? msg.author : opponent;
				const sign = userTurn ? "X" : "O";
				var choice;

				if (!opponent.bot || (opponent.bot && userTurn)) {
					const embed = new Discord.RichEmbed()
					.setColor("RANDOM")
					.setDescription(commonTags.stripIndents`
					\`\`\`
					${sides[0]} | ${sides[1]} | ${sides[2]}
					—————————
					${sides[3]} | ${sides[4]} | ${sides[5]}
					—————————
					${sides[6]} | ${sides[7]} | ${sides[8]}
					\`\`\``)
					await msg.channel.send(embed).catch(console.error);

					const turn = await msg.channel.awaitMessages((res) => {
						return res.author.id === user.id;
					}, {
						max: 1,
						time: 30000
					});

					if (!turn.size) {
						await msg.channel.send(user, {
						  embed: {
							  color: randomColor,
							  description: "Reddetti gibi görünüyor...",
							  author: {
								  name: this.client.user.username,
								  icon_url: this.client.user.displayAvatarURL
							  }
						  }
					  }).catch(console.error);

						break;
					}

					choice = turn.first().content;
				} else {
					const filter = sides.filter((side) => {
						return !["X", "O"].includes(side);
					});

					choice = filter[Math.floor(Math.random() * filter.length)];
				}

				if (taken.includes(choice)) {
					await msg.say(user, {
					  embed: {
						  color: randomColor,
						  description: "Bu yer zaten alındı!",
						  author: {
							  name: this.client.user.username,
							  icon_url: this.client.user.displayAvatarURL
						  }
					  }
				  }).catch(console.error);
				} else

				if (!sides.includes(choice)) {

					await msg.say(msg.author, {
					  embed: {
						  color: randomColor,
						  description: "Orasının geçerli bir nokta olduğunu düşünmüyorum...",
						  author: {
							  name: this.client.user.username,
							  icon_url: this.client.user.displayAvatarURL
						  }
					  }
				  }).catch(console.error);
				} else {
					sides[parseInt(choice, 10)] = sign;
					taken.push(choice);

					if ((sides[0] === sides[1] && sides[0] === sides[2])
					  || (sides[0] === sides[3] && sides[0] === sides[6])
						|| (sides[3] === sides[4] && sides[3] === sides[5])
						|| (sides[1] === sides[4] && sides[1] === sides[7])
						|| (sides[6] === sides[7] && sides[6] === sides[8])
						|| (sides[2] === sides[5] && sides[2] === sides[8])
						|| (sides[0] === sides[4] && sides[0] === sides[8])
						|| (sides[2] === sides[4] && sides[2] === sides[6])) {
						winner = userTurn ? msg.author : opponent;
					}

					userTurn = !userTurn;
				}
			}

			this.playing.delete(msg.channel.id);

			return msg.say(winner ? winner : "", {
				embed: {
					color: randomColor,
					description: winner ? `Tebrikler, ${winner}!` : "Oh, sanırım kedicik kazandı.",
					author: {
						name: this.client.user.username,
						icon_url: this.client.user.displayAvatarURL
					}
				}
			}).catch(console.error);
		} catch (err) {
			this.playing.delete(msg.channel.id);

			return msg.say(msg.author, {
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
