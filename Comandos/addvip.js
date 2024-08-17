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
      .setDescription(`_**Como usar:**_\n⚙ Adicionar VIP: **${c.prefix}addvip <usuário>**`)
    return message.reply({ embeds: [usage] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  const vipRoleId = "749291559165493308";

  if (member.roles.cache.has(vipRoleId)) {
    const alreadyVip = new MessageEmbed()
      .setColor(c.cor)
      .setDescription("🛑 O usuário já é VIP.")
    return message.reply({ embeds: [alreadyVip] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
  }

  await member.roles.add(vipRoleId).catch(() => {});

  const success = new MessageEmbed()
    .setDescription(`⭐ <@&${vipRoleId}> adicionado a **${member.user.tag}**`)
    .setColor(c.cor)
  return message.reply({ embeds: [success] }).then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
};