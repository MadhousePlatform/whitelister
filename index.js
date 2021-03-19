// ###################
// ## CONFIGURATION ##
// ###################

const API_KEY=""; // API key from pterodactyl
const URL=""; // the url of your pterodactyl installation
const ADMIN=false;
const WHITELIST_FILENAME="whitelist_names.txt"; // name of file where usernames are stored
const SERVER_ID=""; // id of the server to run the whitelist command on

// #### DO NOT EDIT BELOW THIS LINE #### //
let Pterodactyl = require('pterodactyl.js');
let readline = require('readline');
let fs = require('fs');

let client = new Pterodactyl.Builder()
    .setURL(URL)
    .setAPIKey(API_KEY);

ADMIN === true ? client.asAdmin() : client.asUser();

const readInterface = readline.createInterface({
    input: fs.createReadStream(WHITELIST_FILENAME),
    outline: process.stdout,
    console: false,
})

client.getServer(SERVER_ID).then(async server => {
    readInterface.on('line', async function(line) {
        await server[0].sendCommand(`whitelist add ${line}`);
    });
});
