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

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const action = args[1]?.toLowerCase();
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);

  if (!member || !action || !role) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle("Como usar")
      .setDescription(`⚙️ Gerenciar cargo: \`${config.prefix}role <@usuário> <add/remove> <@cargo>\``)
    return message.reply({ embeds: [embed] });
  }

  if (!["add", "remove"].includes(action)) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription("🛑 Ação inválida. Use 'add' ou 'remove'.")
    return message.reply({ embeds: [embed] });
  }

  const hasRole = member.roles.cache.has(role.id);

  if (action === "add" && hasRole) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🛑 ${member.user} já possui o cargo ${role}.`)
    return message.reply({ embeds: [embed] });
  }

  if (action === "remove" && !hasRole) {
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🛑 ${member.user} não possui o cargo ${role}.`)
    return message.reply({ embeds: [embed] });
  }

  try {
    if (action === "add") {
      await member.roles.add(role);
    } else {
      await member.roles.remove(role);
    }

    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setTitle(`Cargo ${action === "add" ? "Adicionado" : "Removido"}`)
      .setDescription(`🗃️ ${action === "add" ? "Adicionado" : "Removido"} ${role} ${action === "add" ? "a" : "de"} ${member.user}.`)
      .setTimestamp()

    message.reply({ embeds: [embed] });
  } catch (error) {
    console.error(`Erro ao ${action === "add" ? "adicionar" : "remover"} cargo:`, error);
    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🛑 Ocorreu um erro ao ${action === "add" ? "adicionar" : "remover"} o cargo. Tente novamente.`)
    message.reply({ embeds: [embed] });
  }
};