const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const config = require("../config.json");

moment.locale("pt-br");

module.exports = (client, member) => {
  const dataCriacao = moment(member.user.createdAt).format("DD/MM/YYYY [às] HH:mm");

  const emojis = [
    '<:number0:749314440922660895>', '<:number1:749314460400877688>', '<:number2:749314474774888558>',
    '<:number3:749314491384070175>', '<:number4:749314508324864041>', '<:number5:749314524472934442>',
    '<:number6:749314541816643677>', '<:number7:749314559415812158>', '<:number8:749314574611644457>',
    '<:number9:749314598104072192>'
  ];

  const contadorMembros = member.guild.memberCount.toString().split("").map(i => emojis[i]).join(" ");
  const canalContagem = client.channels.cache.get("747962403047735308");

  if (canalContagem) {
    canalContagem.setTopic(`<a:baladinha:749317275663859855> Estamos com ${contadorMembros} nesse **BAILÃO**!!`);
  }

  const embedSaida = new MessageEmbed()
    .setDescription(`📤 **${member.user}** _**Saiu**_ do servidor.\n📅 Conta criada em: **${dataCriacao}**`)
    .setColor(config.cor);

  const canalSaida = client.channels.cache.get("749397630836277278");
  if (canalSaida) {
    canalSaida.send(embedSaida);
  }
};
