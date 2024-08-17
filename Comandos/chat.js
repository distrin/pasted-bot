const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "chat",
  description: "Abre ou fecha o chat para todos os usuários",
  usage: "<on/off>",
  permissions: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) {
      const embed = new MessageEmbed()
        .setColor(config.cor)
        .setDescription("🛑 Você não possui permissões suficientes. (Gerenciar Canais)")
        .setFooter({ text: "Permissão necessária: Gerenciar Canais" });
      return message.reply({ embeds: [embed] });
    }

    await message.delete();

    const estado = args[0]?.toLowerCase();

    if (!estado || (estado !== "on" && estado !== "off")) {
      const embed = new MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🛑 Uso incorreto. Utilize: \`${config.prefix}chat <on/off>\``)
        .setFooter({ text: "on: Abrir chat | off: Fechar chat" });
      return message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));
    }

    const novoEstado = estado === "on";
    await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
      SEND_MESSAGES: novoEstado
    });

    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`🚧 Chat **${novoEstado ? "aberto" : "fechado"}** por: **${message.author.tag}**`)
      .setFooter({ text: `${novoEstado ? "Todos podem enviar mensagens" : "Apenas staff pode enviar mensagens"}` });
    
    return message.channel.send({ embeds: [embed] }).then(msg => setTimeout(() => msg.delete(), 5000));
  }
};
