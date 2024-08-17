const { MessageEmbed } = require("discord.js");
const config = require('../config.json');
const mergeImg = require('merge-img');
const fs = require('fs').promises;

module.exports.run = async (bot, message, args) => {
    const user1 = message.mentions.members.first();
    const user2 = message.mentions.members.last();

    if (!user1 || !user2 || user1 === user2) {
        const embed = new MessageEmbed()
            .setColor(config.cor)
            .setDescription(`❌ Uso correto: \`${config.prefix}casal <@membro1> <@membro2>\``)
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
            .setTimestamp();
        return message.reply({ embeds: [embed] });
    }

    try {
        const mergedImage = await mergeImg([
            user1.user.displayAvatarURL({ format: "png", size: 256 }),
            user2.user.displayAvatarURL({ format: "png", size: 256 })
        ]);

        const buffer = await new Promise((resolve, reject) => {
            mergedImage.getBuffer('image/png', (err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);
            });
        });

        await fs.writeFile('./Assets/Casal.png', buffer);

        const embed = new MessageEmbed()
            .setDescription('💕 Que casal lindo! ❤')
            .setColor(config.cor)
            .setImage('attachment://Casal.png')
            .setFooter({ text: `Solicitado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        await message.reply({ embeds: [embed], files: ['./Assets/Casal.png'] });
        await fs.unlink('./Assets/Casal.png');
    } catch (error) {
        console.error('Erro ao processar o comando casal:', error);
        message.reply('Ocorreu um erro ao processar o comando. Por favor, tente novamente mais tarde.');
    }
};