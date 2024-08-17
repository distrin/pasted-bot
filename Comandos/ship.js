const Jimp = require('jimp');
const Fs = require('fs');
const Discord = require('discord.js')
const c = require("../config.json")

exports.run = async (client, message, args) => {
    
    const bg = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/640445985100922900/ship_cmd.png')
    const mascara = await Jimp.read('https://cdn.discordapp.com/attachments/560256504998133780/640445988594778113/ship_cmd_mask.png')
    const fonte = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    const Corafonte = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK)
    let shipOne = message.mentions.members.first(2)[0] || message.guild.members.cache.get(args[0])
    let shipSec = message.mentions.members.first(2)[1] || message.guild.members.cache.get(args[1])

    if(!shipOne) shipOne = message.guild.members.cache.get(client.user.id)
    if(!shipSec) shipSec = message.guild.members.cache.get(message.author.id)

    let userOne = shipOne.user.username.replace(/[^a-zA-Zs]/g, "")
    let userSec = shipSec.user.username.replace(/[^a-zA-Zs]/g, "")
    
    let Text = [
        {
            txt: "💔 Só com muita fé!",
            padrão: 0
        },{
            txt: "💙 Somente amigos?!",
            padrão: 15
        },{
            txt: "🤍 Melhores amigos?!",
            padrão: 25
        },{
            txt: "💕 Os opostos se atraem!?",
            padrão: 50
        },{
            txt: `💖 Hmm, basta a **${shipOne}** aceitar.`,
            padrão: 75
        },{
            txt: "💘 Foram feitos um para o outro.",
            padrão: 100
        }
    ]

    let rnd = Math.floor(Math.random() * Text.length)

    let avatarOne = await Jimp.read(shipOne.user.displayAvatarURL({ format: "png" }))
    let avatarSec = await Jimp.read(shipSec.user.displayAvatarURL({ format: "png" }))

    mascara.resize(450, 450)

    avatarOne.resize(450, 450)
    avatarSec.resize(450, 450)

    avatarOne.mask(mascara);
    avatarSec.mask(mascara);
    
    bg.composite(avatarOne, 50, 50)
    bg.composite(avatarSec, 1100, 50)
    
    if(Text[rnd].padrão < 10) {

    bg.print(Corafonte, 715, 215, Text[rnd].padrão + "%")

    } else if(Text[rnd].padrão === 100) {

    bg.print(Corafonte, 650, 215, Text[rnd].padrão + "%")

    } else {

    bg.print(Corafonte, 685, 215, Text[rnd].padrão + "%")

    }
    
    bg.print(fonte, 170, 450, userOne)
    bg.print(fonte, 1200, 450, userSec)
    
    .write('Assets/ship.png')

    message.reply(new Discord.MessageEmbed()
        .setColor(c.cor)
        .setDescription(`**${shipOne.user.username}** ❤ **${shipSec.user.username}**\n_${Text[rnd].txt}_`)
        .attachFiles(['Assets/ship.png'])
        .setImage('attachment://ship.png')
    ).then(S => {
        Fs.unlink('Assets/ship.png',(e) => {if(e) console.log(e)})
    })
}