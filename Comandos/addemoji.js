const { MessageEmbed } = require("discord.js");
const c = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Gerenciar Emojis)")
    return message.reply({ embeds: [embed] });
  }

  const emoteName = args[0];
  const emoteURL = args[1];

  if (!emoteName || !emoteURL) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`_**Como usar:**_\n⚙ Adicionar emoji: **${c.prefix}addemoji <nome> <url>**`)
    return message.reply({ embeds: [embed] });
  }

  try {
    const newEmoji = await message.guild.emojis.create(emoteURL, emoteName);
    const successEmbed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`🍕 O emoji ${newEmoji} foi adicionado com sucesso!`)
    message.reply({ embeds: [successEmbed] });
  } catch (error) {
    console.error("Erro ao adicionar emoji:", error);
    const errorEmbed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription("🛑 Ocorreu um erro ao tentar adicionar o emoji.")
    message.reply({ embeds: [errorEmbed] });
  }
};