require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', msg => {
    if (msg.author.bot) return;
    // if (!msg.content.startsWith(prefix)) return;

    // const commandBody = msg.content.slice(prefix.length);
    // const args = commandBody.split(' ');
    // const command = args.shift().toLowerCase();

    if (msg.content === "ping") {
        msg.reply(`pas pong`);
    }

    const str = msg.content.replace(/\s/g, '');
    console.log(str);
    if (str == "j'aifaim") {
        msg.reply(`Bas mange frr!`);
    }
});

// client.on('message', msg => {
//     if (msg.author.bot) return;
//     if (!msg.content.startsWith(prefix)) return;

//     const commandBody = msg.content.slice(prefix.length);
//     const args = commandBody.split(' ');
//     const command = args.shift().toLowerCase();

//     if (command === "faim") {
//         msg.reply(`Bas mange frr!`);
//     }
// });



client.login(process.env.TOKEN);
