const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const c = require("../config.json");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não possui permissões suficientes. (Banir Membros)`
      )
    return message.reply(embed);
  }

  message.delete()

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!member) {
    const nargs0 = new MessageEmbed()
    .setColor(c.cor)
    .setDescription(
      `_**Como usar:**_
      ⚙ Remover Vip: **${c.prefix}removevip <usuário>**`
    )
    return message.reply(nargs0).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  } 

  if (!member.roles.cache.get("749291559165493308")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 O usuário não é vip.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
  
      member.roles.remove("749291559165493308").catch(O_o => {})
  
      const sucess = new MessageEmbed()
      .setDescription(
        `⭐ **<@&749291559165493308>** removido de **${member.user.tag}**`
      )
            .setColor(c.cor)
        message.reply(sucess).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
      
};