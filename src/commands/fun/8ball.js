const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

const { fun } = require('../../utils/emojis.js');

const answers = [
	'It is certain.',
	'It is decidedly so.',
	'Without a doubt.',
	'Yes - definitely.',
	'You may rely on it.',
	'As I see it, yes.',
	'Most likely.',
	'Outlook good.',
	'Yes.',
	'Signs point to yes.',
	'Reply hazy, try again.',
	'Ask again later.',
	'Better not tell you now.',
	'Cannot predict now.',
	'Concentrate and ask again.',
	'Don\'t count on it.',
	'My reply is no.',
	'My sources say no.',
	'Outlook not so good.',
	'Very doubtful.',
];

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8ball',
			usage: '8ball <question>',
			aliases: ['fortune'],
			description: 'Asks the magic 8-Ball for some physic wisdom.',
			type: client.types.FUN,
			examples: ['8ball Am I going to become a superhero?', 'fortune Is Signal a good bot?'],
			clientPermissions: ['EMBED_LINKS'],
			guilds: ['GLOBAL'],
		});
	}
	run(message, args) {
		const question = args.join(' ');

		if (!question) return this.sendErrorMessage(message, 0, 'Please provide a question to ask');

		const embed = new MessageEmbed()
			.setTitle(`${fun} Magic 8-Ball 🎱`)
			.addField('Question', question)
			.addField('Answer', answers[Math.floor(Math.random() * answers.length)])
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.dispayHexColor);

		message.reply({ embeds: [embed] });
	}

	slashRun(interaction, args) {
		const question = args.first()?.value;

		const embed = new MessageEmbed()
			.setTitle(`${fun} Magic 8-Ball 🎱`)
			.addField('Question', question)
			.addField('Answer', answers[Math.floor(Math.random() * answers.length)])
			.setFooter(interaction.member.displayName, interaction.user.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(interaction.guild.me.dispayHexColor);

		interaction.reply({ ephemeral: true, embeds: [embed] });
	}

	generateSlashCommand() {
		return {
			name: this.name,
			description: this.description,
			options: [{
				name: 'question',
				type: 'STRING',
				description: 'Question to ask the mystical eight ball',
				required: true,
			}],
		};
	}
};