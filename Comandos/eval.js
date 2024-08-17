const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const config = require("../config.json");

exports.run = (client, message, args) => {
    if (!config.ownerIds.includes(message.author.id)) {
        const embed = new MessageEmbed()
            .setColor(config.cor)
            .setTitle('❌ Acesso Negado')
            .setDescription('Este comando é restrito apenas para os desenvolvedores do bot.')
            .setFooter({ text: 'Se você acredita que isso é um erro, entre em contato com o suporte.' });
        return message.reply({ embeds: [embed] });
    }

    const input = args.join(" ");
    try {
        let output = eval(input);

        if (typeof output !== "string") output = inspect(output);

        if (output.length > 1950) output = output.substr(0, 1950) + '...';

        const resultEmbed = new MessageEmbed()
            .setColor(config.cor)
            .setTitle('✅ Execução bem-sucedida')
            .setDescription(`\`\`\`js\n${output}\n\`\`\``)
            .setFooter({ text: 'Comando eval executado com sucesso' });

        message.channel.send({ embeds: [resultEmbed] });
    } catch (error) {
        const errorEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('❌ Erro na execução')
            .setDescription(`\`\`\`\n${error}\n\`\`\``)
            .setFooter({ text: 'Ocorreu um erro ao executar o comando eval' });

        message.channel.send({ embeds: [errorEmbed] });
    }
}