const { MessageEmbed } = require("discord.js");
const c = require("../config.json");

module.exports.run = async (client, message, args, database) => {
  array = [];

  const pushdb = database.ref(`Baladinha/Usuários`);
  const db = await pushdb
    .orderByChild("Xp")
    .limitToLast(10)
    .once("value");

  await db.forEach(snap => {
    array.push({
      User: snap.val().User,
      Level: snap.val().Level,
      Xp: snap.val().Xp
    });
  });

  array.sort((a, b) => b.Xp - a.Xp);

  const embed = new MessageEmbed()
    .setDescription(`_**Usuários:**_\n${ array.map((a, posição) => {
      if (a.Xp == 0) return;
  
      return `_**${posição + 1}º ${message.guild.members.cache.get(a.User).user.username} (${a.Xp})**_\nㅤ💸 Hype: **${a.Level}%**`
    }).join("\n\n")}`)
    .setColor(c.cor)
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setFooter(message.member.user.tag)
    .setTimestamp()

  return message.reply(embed);
};