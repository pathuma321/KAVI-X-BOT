const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
require('./server.js');
require('./settings.js')
const { File } = require('megajs')
const fs = require('fs')
let p;

async function genSession() {
   if (!sessionID) {
      console.log('Please add your session to SESSION_ID env !!');
      process.exit(1);
   }

   // Extract Mega file ID and key from sessionID
   const sessdata = sessionID.replace("KAVI-X-SESSION-ID~~~", '');
   const megaUrl = `https://mega.nz/file/${sessdata}`;

   try {
      // Create the Mega File instance
      const file = File.fromURL(megaUrl);

      // Ensure the sessions folder exists
      const sessionsDir = path.join(__dirname, 'session');
      if (!fs.existsSync(sessionsDir)) {
         fs.mkdirSync(sessionsDir, { recursive: true });
      }

      // Destination path
      const filePath = path.join(sessionsDir, 'creds.json');

      // Download and save the file
      file.download((err, data) => {
         if (err) {
               console.error('Error downloading session file');
               process.exit(1);
         }
         fs.writeFile(filePath, data, (writeErr) => {
               if (writeErr) {
                  console.error('Error saving session file');
                  process.exit(1);
               }
               console.log('SESSION DOWNLOADED COMPLETED ✅');
         });
      });
   } catch (error) {
      console.log('Failed to download session file');
      process.exit(1);
   }
}

genSession()

function start() {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
   console.log([process.argv[0], ...args].join('\n'));

   p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('Restarting Bot...');
            p.kill();
            start();
         }
      })
      .on('exit', code => {
         console.error('Exited with code:', code);
         if (code == '.' || code == 1 || code == 0) {
            start();
         }
      });
}

function restartBot() {
   if (p) {
     p.kill();
     start();
   }
}

start();

if (restart) {
   setInterval(restartBot, 2 * 60 * 60 * 1000);
}
