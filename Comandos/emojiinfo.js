const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("❌ Erro")
      .setDescription("Por favor, forneça o nome ou ID de um emoji válido.")
    return message.reply({ embeds: [embed] });
  }

  const emoji = message.guild.emojis.cache.find(e => e.name === args[0] || e.id === args[0]);

  if (!emoji) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("❌ Erro")
      .setDescription("Emoji não encontrado. Verifique se o nome ou ID está correto.")
    return message.reply({ embeds: [embed] });
  }

  const embed = new MessageEmbed()
    .setColor(config.cor)
    .setTitle("Informações do Emoji")
    .addFields(
      { name: "Emoji", value: `${emoji}`, inline: true },
      { name: "Nome", value: emoji.name, inline: true },
      { name: "ID", value: emoji.id, inline: true },
      { name: "Animado", value: emoji.animated ? "Sim" : "Não", inline: true },
      { name: "Criado em", value: emoji.createdAt.toLocaleDateString(), inline: true },
      { name: "URL", value: emoji.url }
    )
    .setThumbnail(emoji.url)
    .setTimestamp()

  return message.reply({ embeds: [embed] });
};
