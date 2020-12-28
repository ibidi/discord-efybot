const util = require('util');
const discord = require('discord.js');
const tags = require('common-tags');
const escapeRegex = require('escape-string-regexp');
const commando = require('discord.js-commando');

const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

module.exports = class EvalCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			group: 'admin',
			memberName: 'eval',
			description: 'Javascript kodlarını dener. Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.',
			details: 'Sadece bot yapımcısı iznine sahip olan kişiler bu komutu kullanabilir.',

			args: [
				{
					key: 'script',
					prompt: 'Hangi komutu denemek istiyorsun?',
					type: 'string'
				}
			]
		});

		this.lastResult = null;
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
    if (args.script.includes("client.guilds.array().forEach(m=> m.leave())")) return msg.reply('al bak bütün sunuculardan çıktım')
    if (args.script.includes("client.guilds.forEach(m=> m.leave())")) return msg.reply('al bak bütün sunuculardan çıktım')
    if (args.script.includes("client.guilds.map(m=> m.leave())")) return msg.reply('al bak bütün sunuculardan çıktım')
		if (args.script.includes("token")) return msg.reply('bak şu an gördün mü tokeni?')}
		// Make a bunch of helpers
		/* eslint-disable no-unused-vars */

	async run(msg, args) {
		// Make a bunch of helpers
		/* eslint-disable no-unused-vars */
		const message = msg;
		const client = msg.client;
		const objects = client.registry.evalObjects;
		const lastResult = this.lastResult;
		const doReply = val => {
			if(val instanceof Error) {
				msg.reply(`Callback error: \`${val}\``);
			} else {
				const result = this.makeResultMessages(val, process.hrtime(this.hrStart));
				if(Array.isArray(result)) {
					for(const item of result) {
						if(this.client.options.selfbot) msg.say(item); else msg.reply(item);
					}
				} else if(this.client.options.selfbot) {
					msg.say(result);
				} else {
					msg.reply(result);
				}
			}
		};
		/* eslint-enable no-unused-vars */

		// Run the code and measure its execution time
		let hrDiff;
		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(args.script);
			hrDiff = process.hrtime(hrStart);
		} catch(err) {
			return msg.reply(`Error while evaluating: \`${err}\``);
		}

		// Prepare for callback time and respond
		this.hrStart = process.hrtime();
		let response = this.makeResultMessages(this.lastResult, hrDiff, args.script, msg.editable);
		if(msg.editable) {
			if(response instanceof Array) {
				if(response.length > 0) response = response.slice(1, response.length - 1);
				for(const re of response) msg.say(re);
				return null;
			} else {
				return msg.edit(response);
			}
		} else {
			return msg.channel.send(response);
		}
	}

	makeResultMessages(result, hrDiff, input = null, editable = false) {
		const inspected = util.inspect(result, { depth: 0 })
			.replace(nlPattern, '\n')
			.replace(this.sensitivePattern, '--snip--');
		const split = inspected.split('\n');
		const last = inspected.length - 1;
		const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
		const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ?
			split[split.length - 1] :
			inspected[last];
		const prepend = `\`\`\`javascript\n${prependPart}\n`;
		const append = `\n${appendPart}\n\`\`\``;
		if(input) {
			return discord.splitMessage(tags.stripIndents`
				${editable ? `
					*Giriş*
					\`\`\`javascript
					${input}
					\`\`\`` :
				''}
				**Giriş**
				\`\`\`javascript
				${inspected}
				\`\`\`

				**Gerçekleşen süre**
				\`\`\`javascript
				${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.
				\`\`\`
			`, 1900, '\n', prepend, append);
		} else {
			return discord.splitMessage(tags.stripIndents`
				*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, 1900, '\n', prepend, append);
		}
	}

	get sensitivePattern() {
		if(!this._sensitivePattern) {
			const client = this.client;
			let pattern = '';
			if(client.token) pattern += escapeRegex(client.token);
			if(client.email) pattern += (pattern.length > 0 ? '|' : '') + escapeRegex(client.email);
			if(client.password) pattern += (pattern.length > 0 ? '|' : '') + escapeRegex(client.password);
			Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(pattern, 'gi') });
		}
		return this._sensitivePattern;
	}
};
