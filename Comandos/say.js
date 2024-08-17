const Discord = require('discord.js')
const c = require("../config.json")

exports.run = async (client, message, args) => {

if (!message.member.hasPermission(['MANAGE_MESSAGES'])) { 
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não possui permissões suficientes. (Gerenciar Mensagens)`
      )
    return message.reply(embed);
  }

  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
  .setColor(c.cor)
  .setDescription(
    `🛑 Use, \`${c.prefix}say <texto>.\``
  )
return message.reply(embed)
}

    let argsresult
    const mChannel = message.mentions.channels.first()

    message.delete()
    if (mChannel) {
      argsresult = args.slice(1).join(' ')
      mChannel.send(argsresult)
    } else {
      argsresult = args.join(' ')
      message.channel.send(argsresult)
    }
  }