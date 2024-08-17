const { MessageEmbed, Permissions } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Gerenciar Mensagens)")
    return message.reply({ embeds: [embed] });
  }

  if (!args[0]) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Informe a quantidade de mensagens que deseja apagar.")
    return message.reply({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  let limit = Math.min(parseInt(args[0]) + 1, 100);

  try {
    await message.channel.bulkDelete(limit);

    const successEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🚯 **${limit - 1}** Mensagens apagadas por: **${message.author.tag}**`)
    message.channel.send({ embeds: [successEmbed] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  } catch (error) {
    console.error("Erro ao apagar mensagens:", error);
    const errorEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Ocorreu um erro ao tentar apagar as mensagens.")
    message.reply({ embeds: [errorEmbed] });
  }
};