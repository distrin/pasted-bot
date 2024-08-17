const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(config.vipRoleId)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Vip)")
    return message.reply({ embeds: [embed] });
  }

  await message.delete();

  const member = message.member;
  const colorRoles = config.colorRoles;

  function removeCargos() {
    colorRoles.forEach(roleId => {
      member.roles.remove(roleId).catch(() => {});
    });
  }

  if (!args[0]) {
    const helpEmbed = new MessageEmbed()
      .setDescription(`
        _**Como usar:**_
        ⚙ Uso: **${config.prefix}cor <nome da cor/0>**

        _**Informações:**_
        🧨 Remover cores: **${config.prefix}cor 0**
        🎨 Paleta de Cores:

        ${colorRoles.map(roleId => `**<@&${roleId}>**`).join('\n')}

        **Obs:** Não é necessário remover uma cor para adicionar outra, o próprio bot faz isso automaticamente.
      `)
      .setColor(config.cor)
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setFooter({ text: message.member.user.tag })
      .setTimestamp()
    return message.reply({ embeds: [helpEmbed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 10000));
  }

  const colorChoice = args[0].toLowerCase();
  
  if (colorChoice === "0") {
    removeCargos();
    const embed = new MessageEmbed()
      .setDescription(`🎨 **${message.member.user.tag}** cores **removidas**.`)
      .setColor(config.cor)
    return message.reply({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  const chosenRole = colorRoles.find(roleId => message.guild.roles.cache.get(roleId).name.toLowerCase() === colorChoice);

  if (!chosenRole) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Cor não encontrada. Use o comando sem argumentos para ver as opções disponíveis.")
    return message.reply({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  if (member.roles.cache.has(chosenRole)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você já possui essa cor.")
    return message.reply({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  removeCargos();
  await member.roles.add(chosenRole).catch(() => {});

  const successEmbed = new MessageEmbed()
    .setDescription(`🎨 **${message.member.user.tag}** cor atualizada para **${colorChoice}**.`)
    .setColor(config.cor)
  return message.reply({ embeds: [successEmbed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
};
