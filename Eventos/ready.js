const { MessageEmbed } = require("discord.js");
const config = require("../config.json");

module.exports = async (client) => {
  const status = [{ 
    name: `${config.prefix}help`, 
    type: "STREAMING", 
    url: "https://www.twitch.tv/seu_canal_aqui" 
  }];

  function setStatus() {
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({ activity: randomStatus });
  }

  setStatus();

  setInterval(() => {
    const mensagens = [
      "🚀 Seja ativo no chat e receba recompensas!",
      "📮 Convide os seus amigos para o servidor!",
      `📛 Tem alguma dúvida sobre o bot? Use **${config.prefix}help**`,
      `📛 Precisa de ajuda? Use **${config.prefix}help**`
    ];

    const mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

    const embed = new MessageEmbed()
      .setColor(config.cor)
      .setDescription(mensagemAleatoria);

    client.guilds.cache.get('ID_DO_SERVIDOR').channels.cache.get("ID_DO_CANAL").send(embed);
  }, 1000 * 60 * 60 * 9); 
};
