const { MessageEmbed } = require("discord.js");
const c = require("../config.json");

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
  .setDescription(
    `**b!avatar** - Exibe o própio avatar ou do usuário mencionado.
**b!cor** - Altera a cor do nome.
**b!emojiinfo** - Mostra informações de um emoji.
**b!help** - Exibe o menu de ajuda.
**b!botinfo** - Mostra informações sobre mim.
**b!serverinfo** - Mostra status do servidor.
**b!userinfo** - Mostra o perfil do usuário.
**b!notify** - Receber as notificações do servidor.
**b!unnotify** - Não receber as notificações do servidor.
**b!addemoji** -  Adiciona um emoji ao servidor.
**b!addvip** - Adiciona Vip em um usuário.
**b!apagar** - Apaga mensagens de um canal.
**b!ban** - Bane um usuário.
**b!softban** - Bane e desbane um usuário.
**b!chat** - Bloquei e desbloqueia um chat.
**b!eval** - Testar parte do comandos.
**b!mute** - Muta um usuário.
**b!slowmode** - Altera o slowmode do chat.
**b!unmute** - Desmuta um usuário
**b!warn** - Dá warn em um usuário.`
  )
  .setColor(c.cor)
  .setAuthor(message.guild.name, message.guild.iconURL())
  .setFooter(message.member.user.tag)
  .setTimestamp()
      message.reply(embed)

};