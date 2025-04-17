const fs = require('fs')
const chalk = require('chalk')

global.sessionID = process.env.SESSIONID || ""
global.botname = process.env.BOTNAME || ""
global.ownernumber = process.env.OWNERNUMBER || ""
global.ownername = process.env.OWNERNAME || ""
global.websitex = process.env.WEBSITEX || ""
global.wagc = process.env.WAGC || ""
global.botscript = process.env.BOTSCRIPT || ""
global.packname = process.env.PACKNAME || "KAVI-X"
global.author = process.env.AUTHOR || ""
global.creator = process.env.CREATOR || ""
global.botprefix = process.env.BOTPREFIX || ""
global.restart = process.env.RESTART || true
global.mongoDB = process.env.MONGODB_URI || "mongodb+srv://kavishka:KAVImihi321@whatsapp-bot.ssmxc2a.mongodb.net/testing?retryWrites=true&w=majority&appName=whatsapp-bot"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
