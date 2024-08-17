const { MessageEmbed } = require("discord.js");
const c = require("../config.json");
const ms = require("ms");

module.exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não possui permissões suficientes. (Gerenciar Canais)`
      )
    return message.reply(embed);
  }

  message.delete()

  let tempo = args[0];

  if (!tempo) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`_**Como usar:**_\n⚙ Uso: **${c.prefix}slowmode <tempo>**.`)
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  } else {

    message.channel.setRateLimitPerUser(tempo).catch(err => {
      const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Ocorreu um erro ao tentar setar o slowmode.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
    })

    const embed = new MessageEmbed()
      .setDescription(`⏳ Slowmode foi definido para **${tempo}** por: **${message.member.user.tag}**.`)
      .setColor(c.cor)
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
};