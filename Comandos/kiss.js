const { MessageEmbed } = require("discord.js");
const config = require('../config.json');

module.exports = {
  name: "kiss",
  description: "Beija um usuário mencionado",
  usage: "<@usuário>",
  run: async (client, message, args) => {
    const user = message.mentions.members.first();
    if (!user) {
      const embed = new MessageEmbed()
        .setColor(config.cor)
        .setDescription(`🛑 Uso incorreto. Utilize: \`${config.prefix}kiss <@usuário>\``)
        .setFooter({ text: "Mencione um usuário para beijar" });
      return message.reply({ embeds: [embed] });
    }

    const gifs = [
      'https://example.com/kiss1.gif',
      'https://example.com/kiss2.gif',
      'https://example.com/kiss3.gif',
      'https://example.com/kiss4.gif',
      'https://example.com/kiss5.gif'
    ];

    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(`💕 ${message.author} deu um beijo em ${user}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setTimestamp()
      .setFooter({ text: "Comando de beijo" });

    return message.reply({ embeds: [embed] });
  }
};