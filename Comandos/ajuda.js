const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
  const comandos = [
    { nome: "avatar", descricao: "Exibe o próprio avatar ou do usuário mencionado." },
    { nome: "cor", descricao: "Altera a cor do nome." },
    { nome: "emojiinfo", descricao: "Mostra informações de um emoji." },
    { nome: "help", descricao: "Exibe o menu de ajuda." },
    { nome: "botinfo", descricao: "Mostra informações sobre o bot." },
    { nome: "serverinfo", descricao: "Mostra status do servidor." },
    { nome: "userinfo", descricao: "Mostra o perfil do usuário." },
    { nome: "notify", descricao: "Receber as notificações do servidor." },
    { nome: "unnotify", descricao: "Não receber as notificações do servidor." },
    { nome: "addemoji", descricao: "Adiciona um emoji ao servidor." },
    { nome: "addvip", descricao: "Adiciona VIP em um usuário." },
    { nome: "apagar", descricao: "Apaga mensagens de um canal." },
    { nome: "ban", descricao: "Bane um usuário." },
    { nome: "softban", descricao: "Bane e desbane um usuário." },
    { nome: "chat", descricao: "Bloqueia e desbloqueia um chat." },
    { nome: "eval", descricao: "Testa parte dos comandos." },
    { nome: "mute", descricao: "Muta um usuário." },
    { nome: "slowmode", descricao: "Altera o slowmode do chat." },
    { nome: "unmute", descricao: "Desmuta um usuário." },
    { nome: "warn", descricao: "Dá warn em um usuário." }
  ];

  const descricaoComandos = comandos.map(cmd => `**${config.prefix}${cmd.nome}** - ${cmd.descricao}`).join('\n');

  const embed = new MessageEmbed()
    .setDescription(descricaoComandos)
    .setColor(config.cor)
    .setTitle("Lista de Comandos")
    .setTimestamp();

  message.reply({ embeds: [embed] });
};