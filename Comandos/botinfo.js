const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const config = require("../config.json");

module.exports.run = (client, message, args) => {
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY, [às] HH:mm");
  };

  const calculateUptime = () => {
    let totalSeconds = client.uptime / 1000;
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
  };

  const embed = new MessageEmbed()
    .setDescription(`_**Sobre:**_
🤖 Nome: **${client.user.username}**
🆔 ID: **${client.user.id}**
🦺 Criador: **[Nome do Criador]**

_**Informações:**_
📅 Criado em: **${formatDate(client.user.createdAt)}**
📮 Resposta: **${Date.now() - message.createdTimestamp}ms**
📊 Uptime: **${calculateUptime()}**`)
    .setColor(config.cor)
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
    .setFooter({ text: message.member.user.tag })
    .setTimestamp();

  return message.reply({ embeds: [embed] });
};
