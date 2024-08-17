const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args, database) => {
  if (!message.member.hasPermission("MUTE_MEMBERS")) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Mutar Membros)")
    return message.reply(embed);
  }

  message.delete();

  const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!usuario) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`**Como usar:**\n⚙ Uso: \`${config.prefix}mute <usuário> <motivo>\``)
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(() => {}));
  }

  if (usuario.user.bot) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não pode mutar um bot.")
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(() => {}));
  }

  if (usuario.id === message.member.id) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não pode mutar-se.")
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(() => {}));
  }

  const motivo = args.slice(1).join(" ") || "Motivo não informado.";
  const cargoMutado = message.guild.roles.cache.find(role => role.name === "Mutado");

  if (!cargoMutado) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 O cargo 'Mutado' não foi encontrado. Por favor, crie-o.")
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }).catch(() => {}));
  }

  database.ref(`Usuarios/${usuario.id}`).once("value").then(async function(snap) {
    if (snap.val() == null) {
      database.ref(`Usuarios/${usuario.id}`).set({
        User: usuario.id,
        Level: 1,
        Xp: 0,
        Warns: 0,
        Mutado: 1
      });
    } else {
      database.ref(`Usuarios/${usuario.id}`).update({
        Mutado: 1
      });
    }

    await usuario.roles.add(cargoMutado).catch(() => {});

    const sucessEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🥊 **${usuario.user.tag}** foi **mutado** com sucesso por: **${message.member.user.tag}**.`)
    message.reply(sucessEmbed).then(msg => msg.delete({ timeout: 5000 }).catch(() => {}));

    const logEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("🥊 Usuário Mutado")
      .setDescription(`
        **Usuário:** ${usuario.user.tag}
        **Moderador:** ${message.member.user.tag}
        **Motivo:** ${motivo}
      `)
      .setThumbnail(usuario.user.displayAvatarURL())
      .setFooter(`ID do usuário: ${usuario.id}`)
      .setTimestamp()

    const logChannel = message.guild.channels.cache.find(channel => channel.name === "punições-log");
    if (logChannel) logChannel.send(logEmbed);

    const dmEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("🥊 Você foi mutado")
      .setDescription(`
        **Servidor:** ${message.guild.name}
        **Moderador:** ${message.member.user.tag}
        **Motivo:** ${motivo}
      `)
      .setFooter("Se você acha que isso foi um erro, contate a administração do servidor.")
      .setTimestamp()

    usuario.send(dmEmbed).catch(() => {});
  });
};