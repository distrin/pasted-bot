const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports.run = (client, message, args) => {
  const member = message.mentions.members.first() || 
                 message.guild.members.cache.get(args[0]) || 
                 message.member;

  const embed = new MessageEmbed()
    .setDescription(
      `**Avatar de:** ${member.user.tag}\n\n` +
      `**[Clique aqui para baixar o avatar](${member.user.displayAvatarURL({ dynamic: true, size: 4096 })})**`
    )
    .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setColor(config.cor)
    .setTimestamp();

  return message.reply({ embeds: [embed] });
};