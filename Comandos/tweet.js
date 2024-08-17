const Discord = require('discord.js');
const fetch = require("node-fetch");
const c = require('../config.json')

exports.run = (client, message, args) => {
    let user = args[0];
    let text = args.slice(1).join(" ") || undefined;
    if (!user) {
        const embed = new Discord.MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Use, \`${c.prefix}tweet <nome> <tweet>.\``
      )
    return message.reply(embed)
    }
    if (user.startsWith("@")) user = args[0].slice(1);
    const type = user.toLowerCase() === "realdonaldtrump" ? "trumptweet" : "tweet";
    const u = user.startsWith("@") ? user.slice(1) : user;
    if (!text) {
        const embed = new Discord.MessageEmbed()
      .setColor(c.cor)
      .setDescription(
        `🛑 Use, \`${c.prefix}tweet <nome> <tweet>.\``
      )
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setFooter(message.member.user.tag)
      .setTimestamp()
    return message.reply(embed)
    }
    message.channel.startTyping();

    fetch(`https://nekobot.xyz/api/imagegen?type=${type}&username=${u}&text=${encodeURIComponent(text)}`)
    .then(res => res.json())
        .then(data => {
            const embed = new Discord.MessageEmbed()
            .setImage(data.message)
            message.reply(embed)
    })

    message.channel.stopTyping(true);
}