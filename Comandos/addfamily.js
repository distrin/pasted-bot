const { MessageEmbed } = require("discord.js");
const c = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("BAN_MEMBERS")) {
    const embed = new MessageEmbed()
      .setColor(c.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Banir Membros)")
    return message.reply({ embeds: [embed] });
  }

  await message.delete();

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!member) {
    const usage = new MessageEmbed()
      .setColor(c.cor)
      .setDescription(`_**Como usar:**_\n⚙ Adicionar Membro: **${c.prefix}addfamily <usuário>**`)
    return message.reply({ embeds: [usage] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  } 

  if (member.roles.cache.has("749290652252110980")) {
    const alreadyMember = new MessageEmbed()
      .setColor(c.cor)
      .setDescription("🛑 O usuário já é da familia.")
    return message.reply({ embeds: [alreadyMember] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  await member.roles.add("749290652252110980").catch(() => {});

  const success = new MessageEmbed()
    .setDescription(`🍬 <@&749290652252110980> adicionado á **${member.user.tag}**`)
    .setColor(c.cor)
  message.reply({ embeds: [success] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
};