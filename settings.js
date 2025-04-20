const fs = require('fs')
const chalk = require('chalk')

global.sessionID = process.env.SESSIONID || "KAVI-X-SESSION-ID~~~L1pDxDQY#nySxLdIqWCJ5DIN24Bwb9K9Uvu3D5dcIFfVAPxC-p6U"
global.botname = process.env.BOTNAME || "PATHUM-X"
global.ownernumber = process.env.OWNERNUMBER || "94785181711"
global.ownername = process.env.OWNERNAME || "Pathum Nimesh"
global.websitex = process.env.WEBSITEX || ""
global.wagc = process.env.WAGC || ""
global.botscript = process.env.BOTSCRIPT || ""
global.packname = process.env.PACKNAME || "PATHUM-X"
global.author = process.env.AUTHOR || "Pathum Nimesh"
global.creator = process.env.CREATOR || ""
global.botprefix = process.env.BOTPREFIX || "."
global.restart = process.env.RESTART || true
global.mongoDB = process.env.MONGODB_URI || "mongodb+srv://kavishka:KAVImihi321@whatsapp-bot.ssmxc2a.mongodb.net/pathuma?retryWrites=true&w=majority&appName=whatsapp-bot"

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update'${__filename}'`))
    delete require.cache[file]
    require(file)
})
