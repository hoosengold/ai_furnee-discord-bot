module.exports = {
	name: 'poll',
	description: 'Makes a poll with reactions.',
	aliases: ['makepoll'],
	cooldown: 5,
	permissions: 'everyone',
	syntax: '*poll <question>? <option1>! <option2>! ... <option20>!',
	args: true,
	execute(message, args) {
		try {
			//Import all required modules
			const Discord = require('discord.js'),
				emojiArray = require('../../utils/emojiArray')

			//format the input
			const questionRegEx = new RegExp(/((\ )*[a-zA-Z]*(\ )*\d*(\ )*)*\?/gm),
				optionsRegEx = new RegExp(/(?:((?:(\ ))*[a-zA-Z]*(?:(\ ))*\d*(\ )*))*\!/i)

			for (let index = 0; index < args.length; index++) {
				console.log(`${args[index]}: ${optionsRegEx.test(args[index])}`)
			}
			//initialize array for the question and options
			let i = 0
			let j = 0
			let pollsArray = []

			//checks if the array element in args ends with ? or !;
			//if the element does not have?/!, add it to the current pollsArray element
			//if it does have?/!, add it to the current pollsArray element and call the j+1 element
			for (i; i < args.length; i++) {
				if (questionRegEx.test(args[i])) {
					if (pollsArray[j] == undefined) {
						pollsArray[j] = args[i]
					} else {
						pollsArray[j] = pollsArray[j] + ' ' + args[i]
					}
					j++
				} else if (optionsRegEx.test(args[i])) {
					if (pollsArray[j] == undefined) {
						pollsArray[j] = args[i]
					} else {
						pollsArray[j] = pollsArray[j] + ' ' + args[i]
					}
					j++
				} else {
					if (pollsArray[j] == undefined) {
						pollsArray[j] = args[i]
					} else {
						pollsArray[j] = pollsArray[j] + ' ' + args[i]
					}
				}
			}
			console.log(`pollsArray: ${pollsArray}`)

			//checks if the command has title
			if (!questionRegEx.test(pollsArray[0])) {
				return message.reply({
					content: 'No poll title specified. Type `*help` for more info.',
					allowedMentions: { repliedUser: true },
				})
			}

			//checks if the command has options and if they are more than 20
			if (!optionsRegEx.test(pollsArray[1])) {
				return message.reply({
					content: 'No poll options specified. Type `*help` for more info.',
					allowedMentions: { repliedUser: true },
				})
			} else if (pollsArray.length > 21) {
				return message.reply({
					content: 'Max. 20 poll options allowed.',
					allowedMentions: { repliedUser: true },
				})
			}

			//creates a string for the options
			let pollMessage = ''
			for (let k = 1; k < pollsArray.length; k++) {
				if (pollMessage === '') {
					pollMessage = `${emojiArray()[k - 1]} ${pollsArray[k]} \n\n `
				} else {
					pollMessage = `${pollMessage} ${emojiArray()[k - 1]} ${pollsArray[k]} \n\n `
				}
			}

			//poll embed format and content
			const embed = {
				color: 'RANDOM',
				title: pollsArray[0],
				description: pollMessage,
				timestamp: new Date(),
			}

			//array with the reactions emojis
			const reactions = ['🇦', '🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']

			//messages the poll and then reacts to it with the reactions[]
			const msg = message.channel.send({ embeds: [embed] }).then(function (message) {
				for (let l = 0; l < j; l++) {
					message.react(reactions[l])
				}
			})
		} catch (error) {
			console.error(error)
		}
	},
}
