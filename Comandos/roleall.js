const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_ROLES")) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Você não possui permissões suficientes. (Gerenciar Cargos)")
    return message.reply({ embeds: [embed] });
  }

  if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Não tenho permissões suficientes. (Gerenciar Cargos)")
    return message.reply({ embeds: [embed] });
  }

  const action = args[0]?.toLowerCase();
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

  if (!action || !role || !["add", "remove"].includes(action)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("Como usar")
      .setDescription(`⚙️ Gerenciar cargos em massa: \`${config.prefix}roleall <add/remove> <@cargo>\``)
    return message.reply({ embeds: [embed] });
  }

  const membersWithRole = message.guild.members.cache.filter(m => m.roles.cache.has(role.id));
  const allMembers = message.guild.members.cache;

  if (action === "add" && membersWithRole.size === allMembers.size) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Todos os usuários já possuem esse cargo.")
    return message.reply({ embeds: [embed] });
  }

  if (action === "remove" && membersWithRole.size === 0) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Nenhum usuário possui esse cargo.")
    return message.reply({ embeds: [embed] });
  }

  const loadingEmbed = new MessageEmbed()
    .setColor(config.cor)
    .setDescription("🧲 Processando...")

  const reply = await message.reply({ embeds: [loadingEmbed] });

  let count = 0;
  for (const member of allMembers.values()) {
    if (action === "add" && !member.roles.cache.has(role.id)) {
      await member.roles.add(role).catch(console.error);
      count++;
    } else if (action === "remove" && member.roles.cache.has(role.id)) {
      await member.roles.remove(role).catch(console.error);
      count++;
    }
  }

  const successEmbed = new MessageEmbed()
    .setColor(config.cor)
    .setTitle(`Cargo ${action === "add" ? "Adicionado" : "Removido"} em Massa`)
    .setDescription(`🧲 ${action === "add" ? "Adicionado" : "Removido"} o cargo ${role} de ${count} usuários.`)
    .setTimestamp()

  await reply.edit({ embeds: [successEmbed] });
};
