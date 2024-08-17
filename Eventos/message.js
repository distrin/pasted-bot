const { MessageEmbed } = require("discord.js");
const config = require("../config.json");
const firebase = require("firebase/app");
require("firebase/database");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;

  const isStaff = message.member.hasPermission('ADMINISTRATOR') || 
                  message.member.roles.cache.has("743568139153047563") ||
                  message.member.roles.cache.has("743568009611837470") ||
                  message.member.roles.cache.has("745597365850865695") ||
                  message.channel.id === "743568287698518018";

  if (!isStaff && message.content.includes('aqui você coloca o link que não vai ser apagdo pelo bot')) {
    await message.delete({ timeout: 1000 });
    const embed = new MessageEmbed()
      .setDescription(`📬 ${message.member.user} Você não pode enviar links aqui.`)
      .setColor(config.cor);
    return message.reply(embed).then(msg => msg.delete({ timeout: 5000 }));
  }

  // Sistema de Level
  const userRef = firebase.database().ref(`Bianca/Usuários/${message.author.id}`);
  const snapshot = await userRef.once("value");
  
  if (!snapshot.exists()) {
    await userRef.set({
      User: message.author.id,
      Level: 1,
      Xp: 0,
      Mutado: 0
    });
  } else {
    const userData = snapshot.val();
    const pointsAdd = Math.floor(Math.random() * 7) + 8;
    const newXp = userData.Xp + pointsAdd;
    const nextLevel = userData.Level * 1000;

    await userRef.update({ Xp: newXp });

    if (nextLevel <= newXp) {
      const newLevel = userData.Level + 1;
      await userRef.update({ Level: newLevel });

      const levelUpEmbed = new MessageEmbed()
        .setDescription(`🍺 Você acaba de ficar **${newLevel}%** mais hypado!`)
        .setColor(config.cor);
      await message.reply(levelUpEmbed);
    }
  }

  if (message.content.startsWith(`<@!${client.user.id}>`)) {
    const mentionEmbed = new MessageEmbed()
      .setDescription(
        `<a:batidaum:745705716391739402> **Olá, no que posso ajudar? _Meu prefixo é \`${config.prefix}\`._**\n\n` +
        `🤖 Eu sou o bot _**Oficial**_ da __1997__, fui criado pelo Tiolucazz _*${message.guild.owner}*_\n` +
        `🗃 Para ver meus comandos digite _**${config.prefix}help**_.`
      )
      .setColor(config.cor);
    return message.reply(mentionEmbed);
  }
  
  if (message.channel.id === "749319154909184040" || message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("KICK_MEMBERS")) {
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args, firebase.database());
  }
};