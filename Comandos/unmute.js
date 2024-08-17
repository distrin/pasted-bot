const { MessageEmbed } = require("discord.js");
const c = require("../config.json");
const ms = require("ms");

module.exports.run = async (client, message, args, database) => {
  if (!message.member.hasPermission("MUTE_MEMBERS")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não possui permissões suficientes. (Mutar Membros)`
      )
    return message.reply(embed);
  }

  message.delete()

  let usuario =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  if (!usuario) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`_**Como usar:**_\n⚙ Uso: **${c.prefix}unmute <usuário>**.`)
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
  if (usuario.id == usuario.user.bot.id) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não pode desmutar um bot.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
  if (usuario.id == message.member.user.id) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não pode desmutar-se.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }

  let motivo = "Aprendeu a obedecer as regras.";

  let cargoMutado = message.guild.roles.cache.get("749299624531198083");

  database
    .ref(`Baladinha/Usuários/${usuario.id}`)
    .once("value")
    .then(async function(snap) {
      if (snap.val() == null) {
        const embed = new MessageEmbed()
          .setColor(c.cor)
          .setDescription(
            `🛑 O usuário não está mutado.`
          )
        return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
      } else {
        database.ref(`Baladinha/Usuários/${usuario.id}`).update({
          Mutado: 0
        });

        usuario.roles.remove(cargoMutado).catch(O_o => {});
        
        const sucess = new MessageEmbed()
          .setColor(c.cor)
          .setDescription(`🥊 **${usuario.user.tag}** foi **desmutado** com sucesso por: **${message.member.user.tag}**.`)
        message.reply(sucess).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))

        const cpunição = new MessageEmbed()
          .setColor(c.cor)
          .setDescription(`🥊 Usuário **Desmutado**.
          
_**Informações:**_
🥋 Usuário: **${usuario.user.tag}**
🦺 Moderador: **${message.member.user.tag}**

_**Sobre:**_
🎈 Motivo: **${motivo}**`)
          .setThumbnail(usuario.user.displayAvatarURL())
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setFooter(message.member.user.tag)
          .setTimestamp()
        message.guild.channels.cache.get("749430358197403749").send(cpunição);

        const dm = new MessageEmbed()
          .setDescription(`🥊 Usuário **Desmutado**.
          
_**Informações:**_
🥋 Usuário: **${usuario.user.tag}**
🦺 Moderador: **${message.member.user.tag}**

_**Sobre:**_
🎈 Motivo: **${motivo}**`)
          .setColor(c.cor)
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setFooter(message.member.user.tag)
          .setTimestamp()
        usuario.send(dm).catch(O_o => {})
      }
    });
};
