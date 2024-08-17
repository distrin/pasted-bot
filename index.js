const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs").promises;
const client = new Discord.Client();
const config = require("./config.json");
const firebase = require("firebase/app");
require("firebase/database");

client.config = config;
client.commands = new Enmap();

const carregarEventos = async () => {
  const arquivos = await fs.readdir("./Eventos/");
  for (const arquivo of arquivos) {
    const evento = require(`./Eventos/${arquivo}`);
    const nomeEvento = arquivo.split(".")[0];
    console.log(`[LOGS] Evento Carregado: ${nomeEvento}`);
    client.on(nomeEvento, evento.bind(null, client));
  }
};

const carregarComandos = async () => {
  const arquivos = await fs.readdir("./Comandos/");
  for (const arquivo of arquivos) {
    if (!arquivo.endsWith(".js")) continue;
    const comando = require(`./Comandos/${arquivo}`);
    const nomeComando = arquivo.split(".")[0];
    console.log(`[LOGS] Comando Carregado: ${nomeComando}`);
    client.commands.set(nomeComando, comando);
  }
};

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "SUA_DATABASE_URL",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
  measurementId: "SEU_MEASUREMENT_ID"
};

(async () => {
  try {
    await carregarEventos();
    await carregarComandos();
    firebase.initializeApp(firebaseConfig);
    await client.login(config.token);
    console.log("[LOGS] Bot conectado com sucesso!");
  } catch (erro) {
    console.error("[ERRO] Falha ao iniciar o bot:", erro);
  }
})();
