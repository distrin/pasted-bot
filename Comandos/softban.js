const { MessageEmbed } = require("discord.js");
const c = require("../config.json");

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

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);

  let motivo = args.slice(1).join(" ");

  if (!member) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`_**Como usar:**_\n⚙ Uso: **${c.prefix}ban <usuário> <motivo>**.`)
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
  if (member.id == member.user.bot.id) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não pode banir um bot.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }
  if (member.id == message.member.user.id) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Você não pode banir-se.`
      )
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
  }

  if (!motivo) motivo = "Motivo não informado";

  const comfirmar = new MessageEmbed()
    .setDescription(
      `🛠 Você tem certeza que deseja banir **${member.user.tag}** do seu servidor?`
    )
    .setColor(c.cor)
  message.reply(comfirmar).then(async msg => {
    await msg.react("✅");
    await msg.react("⏹");
    const filter = (reaction, user) =>
      ["✅", "⏹"].includes(reaction.emoji.name) &&
      user.id === message.author.id;
    const collector = msg.createReactionCollector(filter);
    collector.on("collect", r => {
      switch (r.emoji.name) {
        case "✅":
          msg.reactions.removeAll();

          const embed = new MessageEmbed()
            .setColor(c.cor)
            .setDescription(`🥊 **${member.user.tag}** foi **punido** com sucesso por: **${message.member.user.tag}**.`)
          msg.edit(embed).then(msg => msg.delete({ timeout: 10000 }).catch(err => {}))

          const cpunição = new MessageEmbed()
            .setColor(c.cor)
            .setDescription(`🥊 Usuário **Banido**.

_**Informações:**_
🥋 Usuário: **${member.user.tag}**
🦺 Moderador: **${message.member.user.tag}**

_**Sobre:**_
🎈 Motivo: **${motivo}**`)
            .setThumbnail(member.displayAvatarURL)
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setFooter(message.member.user.tag)
            .setTimestamp()
          message.guild.channels.cache.get("749430358197403749").send(cpunição);

          message.guild
            .member(member)
            .ban(motivo)
            .catch(err => {
                const erro = new MessageEmbed()
                .setDescription(`🛑 Não foi possível banir o usuário.`)
                .setColor(c.cor)
              msg.edit(erro).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))
            });

            message.guild.members
            .unban(member)
            .catch(err => {})

          break;
        case "⏹":
          msg.reactions.removeAll();

          const cancelado = new MessageEmbed()
            .setDescription(`🛑 Banimento cancelado.`)
            .setColor(c.cor)
          msg.edit(cancelado).then(msg => msg.delete({ timeout: 5000 }).catch(err => {}))

          break;
      }
    });
  });
};