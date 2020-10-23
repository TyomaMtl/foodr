require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
// const prefix = "!";
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ restaurant: [], count: 0 }).write();
db.set('user.name', 'typicode').write();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    // if (!msg.content.startsWith(prefix)) return;
    // const commandBody = msg.content.slice(prefix.length);
    // const args = commandBody.split(' ');
    // const command = args.shift().toLowerCase();

    const getId = db.get('restaurant').value();
    // A garder pour ajoutez le restaurant sur la BD

    // const getLastId = db.get('restaurant').takeRight(1).value();
    // db.get('restaurant')
    //   .push({ id: getLastId + 1, title: 'Mcdo'})
    //   .write();

    if (msg.content === "ping") {
        msg.reply(`pas pong`);
    }

    const str = msg.content.replace(/\s/g, '');
    if (str == "j'aifaim") {
        if (getId.length > 0) {
            const item = getId[Math.floor(Math.random() * getId.length)];
            const getRestau = item.title;
            msg.reply(`, tu peux manger chez ${getRestau}`);
        } else {
            msg.reply(`Mmmmh, j'espère que tu n'as pas trop faim`);
        }
    }
});


client.login(process.env.TOKEN);
