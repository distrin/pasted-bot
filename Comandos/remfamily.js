const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Banir Membros)")
    return message.reply({ embeds: [embed] });
  }

  await message.delete().catch(console.error);

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!member) {
    const usageEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("Como usar")
      .setDescription(`⚙ Remover Membro: \`${config.prefix}remfamily <@usuário>\``)
    return message.channel.send({ embeds: [usageEmbed] }).then(msg => setTimeout(() => msg.delete().catch(console.error), 5000));
  } 

  const familyRoleId = "ID_DO_CARGO_DA_FAMILIA";

  if (!member.roles.cache.has(familyRoleId)) {
    const notFamilyEmbed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 O usuário não é da família.")
    return message.channel.send({ embeds: [notFamilyEmbed] }).then(msg => setTimeout(() => msg.delete().catch(console.error), 5000));
  }

  await member.roles.remove(familyRoleId).catch(console.error);

  const successEmbed = new MessageEmbed()
    .setColor(config.cor)
    .setTitle("Membro Removido da Família")
    .setDescription(`🍬 Cargo de família removido de **${member.user.tag}**`)
    .setTimestamp()
  
  message.channel.send({ embeds: [successEmbed] }).then(msg => setTimeout(() => msg.delete().catch(console.error), 5000));
};