require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
// const prefix = "!";
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

const adapterhelp = new FileSync('dbhelp.json');
const dbhelp = low(adapterhelp);


db.defaults({ restaurant: [], count: 0 }).write();
dbhelp.defaults({ help: []}).write();

db.set('user.name', 'typicode').write();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    if (msg.author.bot) return;

    const str = msg.content.replace(/\s/g, '');

    // if (!msg.content.startsWith(prefix)) return;
    // const commandBody = msg.content.slice(prefix.length);
    // const args = commandBody.split(' ');
    // const command = args.shift().toLowerCase();

    const getIdRestau = db.get('restaurant').value();
    const getIdHelp = dbhelp.get('help').value();
    // A garder pour ajoutez le restaurant sur la BD

    // const getLastId = db.get('restaurant').takeRight(1).value();
    // db.get('restaurant')
    //   .push({ id: getLastId + 1, title: 'Mcdo'})
    //   .write();

    if (msg.content === "ping") {
        msg.reply(`pas pong`);
    }


    if (str == "j'aifaim") {
        if (getIdRestau.length > 0) {
            const item = getIdRestau[Math.floor(Math.random() * getIdRestau.length)];
            const getRestau = item.title;

            if (msg.channel.type === 'dm') {
                msg.reply(`${msg.author.username}, tu peux manger chez ${getRestau}`);
            } else {
                msg.reply(`, tu peux manger chez ${getRestau}`);
            }

        } else {
            msg.reply(`Mmmmh, j'espère que tu n'as pas trop faim ${msg.author.username}`);
        }
    }


    if (str == "foodrhelp") {
        getIdHelp.map((x) => {
            msg.reply(`${x.features}`);
        });

    }
});


client.login(process.env.TOKEN);
