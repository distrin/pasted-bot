const { MessageEmbed, Permissions } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Banir Membros)")
    return message.reply({ embeds: [embed] });
  }

  await message.delete();

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const motivo = args.slice(1).join(" ") || "Motivo não informado";

  if (!member) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`_**Como usar:**_\n⚙ Uso: **${config.prefix}ban <usuário> <motivo>**`)
    return message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  if (member.id === client.user.id || member.id === message.author.id || !member.bannable) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Não é possível banir este usuário.")
    return message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  const confirmEmbed = new MessageEmbed()
    .setDescription(`🛠 Você tem certeza que deseja banir **${member.user.tag}** do servidor?`)
    .setColor(config.cor)

  const confirmMsg = await message.channel.send({ embeds: [confirmEmbed] });
  await confirmMsg.react("✅");
  await confirmMsg.react("⏹");

  const filter = (reaction, user) => ["✅", "⏹"].includes(reaction.emoji.name) && user.id === message.author.id;
  const collector = confirmMsg.createReactionCollector({ filter, time: 30000 });

  collector.on("collect", async (reaction) => {
    if (reaction.emoji.name === "✅") {
      try {
        await member.ban({ reason: motivo });
        const successEmbed = new MessageEmbed()
          .setColor(config.cor)
          .setDescription(`🥊 **${member.user.tag}** foi banido com sucesso por: **${message.author.tag}**`)
        await confirmMsg.edit({ embeds: [successEmbed] });

        const logEmbed = new MessageEmbed()
          .setColor(config.cor)
          .setDescription(`🥊 Usuário **Banido**
          
          _**Informações:**_
          🥋 Usuário: **${member.user.tag}**
          🦺 Moderador: **${message.author.tag}**
          
          _**Sobre:**_
          🎈 Motivo: **${motivo}**`)
          .setThumbnail(member.user.displayAvatarURL())
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
          .setFooter({ text: message.author.tag })
          .setTimestamp()

        const logChannel = message.guild.channels.cache.find(channel => channel.name === "logs-de-punicoes");
        if (logChannel) logChannel.send({ embeds: [logEmbed] });
      } catch (error) {
        console.error(error);
        const errorEmbed = new MessageEmbed()
          .setDescription("🛑 Não foi possível banir o usuário.")
          .setColor(config.cor)
        await confirmMsg.edit({ embeds: [errorEmbed] });
      }
    } else {
      const cancelEmbed = new MessageEmbed()
        .setDescription("🛑 Banimento cancelado.")
        .setColor(config.cor)
      await confirmMsg.edit({ embeds: [cancelEmbed] });
    }

    setTimeout(() => confirmMsg.delete().catch(() => {}), 5000);
  });

  collector.on("end", (collected, reason) => {
    if (reason === "time") {
      const timeoutEmbed = new MessageEmbed()
        .setDescription("⏳ Tempo esgotado. Banimento cancelado.")
        .setColor(config.cor)
      confirmMsg.edit({ embeds: [timeoutEmbed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }
  });
};
