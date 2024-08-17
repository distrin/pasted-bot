const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const config = require("../config.json");

const status = {
  online: "Online",
  idle: "Ausente",
  dnd: "Ocupado",
  offline: "Offline/Invisível"
};

module.exports.run = (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const createdAt = moment(member.user.createdAt).format("DD/MM/YYYY [às] HH:mm");

  const embed = new MessageEmbed()
    .setColor(config.cor)
    .setTitle("Informações do Usuário")
    .addFields(
      { name: "👤 Usuário", value: member.user.tag, inline: true },
      { name: "🆔 ID", value: member.user.id, inline: true },
      { name: "📊 Status", value: status[member.presence?.status] || "Desconhecido", inline: true },
      { name: "📅 Conta criada em", value: createdAt, inline: false },
      { name: "🏷️ Cargos", value: member.roles.cache.filter(r => r.id !== message.guild.id).map(r => `<@&${r.id}>`).join(", ") || "Nenhum cargo" }
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: `Solicitado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

  return message.reply({ embeds: [embed] });
};
