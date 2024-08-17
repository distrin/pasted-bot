const { MessageEmbed } = require("discord.js");
const moment = require("moment");
moment.locale("pt-br");
const config = require("../config.json");
const firebase = require("firebase/app");
require("firebase/database");

module.exports = async (client, member) => {
  const dataCriacao = moment(member.user.createdAt).format("DD/MM/YYYY [às] HH:mm");
  
  const emojis = ['<:number0:749314440922660895>', '<:number1:749314460400877688>', '<:number2:749314474774888558>', '<:number3:749314491384070175>', '<:number4:749314508324864041>', '<:number5:749314524472934442>', '<:number6:749314541816643677>', '<:number7:749314559415812158>', '<:number8:749314574611644457>', '<:number9:749314598104072192>'];
  const contadorMembros = member.guild.memberCount.toString().split("").map(i => emojis[i]).join(" ");
  
  const canalContagem = client.channels.cache.get("ID_DO_CANAL_CONTAGEM");
  if (canalContagem) {
    canalContagem.setTopic(`<a:baladinha:749317275663859855> Estamos com ${contadorMembros} nesse **BAILÃO**!!`);
  }

  const cargosMembro = ["ID_CARGO_1", "ID_CARGO_2"];
  cargosMembro.forEach(cargoId => {
    member.roles.add(cargoId).catch(() => {});
  });

  const embedEntrada = new MessageEmbed()
    .setDescription(`📥 **${member.user}** _**Entrou**_ no servidor.\n📅 Conta criada em: **${dataCriacao}**`)
    .setColor(config.cor);
  
  const canalBoasVindas = client.channels.cache.get("ID_DO_CANAL_BOAS_VINDAS");
  if (canalBoasVindas) {
    canalBoasVindas.send(embedEntrada);
  }

  const embedDM = new MessageEmbed()
    .setAuthor(client.user.username + " | Bem Vindo", client.user.displayAvatarURL())
    .setDescription(`**<a:baladinha:749317275663859855> Olá _${member}_, É um prazer vê-lo(la) aqui na __BLD__.**

_**Registro:**_
🗃 Canal: **<#ID_DO_CANAL_REGISTRO>**

_**Regras:**_
🗃 Canal: **<#ID_DO_CANAL_REGRAS>**

**\`-\` Seja Bem Vindo(a)! E divirta-se __${member.user.username}__.**`)
    .setThumbnail(member.user.displayAvatarURL())
    .setColor(config.cor);
  
  member.send(embedDM).catch(() => {});

  const canalGeral = client.channels.cache.get("ID_DO_CANAL_GERAL");
  if (canalGeral) {
    canalGeral.send(`**<a:baladinha:749317275663859855> _${member}_, Bem vindo(a) á __BLD__!**\n_**\`-\` Registre-se em **<#ID_DO_CANAL_REGISTRO>**.**_`);
  }

  const database = firebase.database();
  const usuarioRef = database.ref(`Baladinha/Usuários/${member.id}`);
  
  usuarioRef.once("value").then(snapshot => {
    if (!snapshot.exists()) {
      usuarioRef.set({
        User: member.id,
        Level: 1,
        Xp: 0,
        Mutado: 0
      });
    } else if (snapshot.val().Mutado === 1) {
      member.roles.add("ID_DO_CARGO_MUTADO").catch(() => {});
    }
  });
};