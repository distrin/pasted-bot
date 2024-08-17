const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "notify",
    description: "Ativa as notificações do servidor para o usuário",
    run: async (client, message, args) => {

        await message.delete().catch(console.error);

        const notificationRoleId = "ID_DO_CARGO_DE_NOTIFICACOES";

        try {

            await message.member.roles.add(notificationRoleId);

            const sucessEmbed = new MessageEmbed()
                .setColor(config.cor)
                .setTitle("🔔 Notificações Ativadas")
                .setDescription(`Você agora receberá todas as notificações de **${message.guild.name}**.`)
                .setFooter({ text: "Use o comando 'unnotify' para desativar as notificações" });

            const reply = await message.channel.send({ embeds: [sucessEmbed] });

            setTimeout(() => reply.delete().catch(console.error), 5000);
        } catch (error) {
            console.error("Erro ao adicionar cargo de notificações:", error);
            message.channel.send("Ocorreu um erro ao ativar as notificações. Por favor, tente novamente mais tarde.").then(msg => {
                setTimeout(() => msg.delete().catch(console.error), 5000);
            });
        }
    }
};