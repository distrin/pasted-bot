const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args, database) => {
  const usuario = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;

  try {
    const snapshot = await database.ref(`Usuarios/${usuario.id}`).once("value");
    const userData = snapshot.val();

    const embed = new MessageEmbed()
      .setTitle("Estatísticas do Usuário")
      .setColor(config.corPadrao)
      .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
      .addField("Usuário", usuario.user.tag, true)
      .addField("Level", userData ? userData.Level : "1", true)
      .addField("XP", userData ? userData.Xp : "0", true)
      .setFooter(`Solicitado por ${message.author.tag}`)
      .setTimestamp();

    return message.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return message.reply("Ocorreu um erro ao buscar as estatísticas. Por favor, tente novamente mais tarde.");
  }
};
