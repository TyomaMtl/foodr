require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('./database');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot) return;

    const str = msg.content
    const getIdRestau = db.get('restaurant').value();
    const getIdHelp = dbhelp.get('help').value();
    const getLastRestaurantId = db.get('restaurant').takeRight(1).value()[0].id;

    let askPersistRestaurant = '(nouveau|new|ajoute) resto, (.*), ([0-9]*)'
    let result = str.match(askPersistRestaurant)
    if (result) {
        let key = result[1]
        let restaurant = result[2]
        let budget = result[3]
        if (key == 'nouveau' || 'new' || 'ajoute' && restaurant != null && budget != null) {
            db.get('restaurant')
                .push({ id: getLastRestaurantId + 1, title: restaurant, budget: budget })
                .write()
        
            msg.reply('bien ajouté mon pote !')
        }
    }

    if (msg.content === "ping") {
        msg.reply(`pas pong`);
    }

    if (str == "j'ai faim") {
        db.getRestaurants((restaurants) => {
            const keys = Object.keys(restaurants)

            if (keys.length === 0) {
                msg.reply(`Mmmmh, j'espère que tu n'as pas trop faim ${msg.author.username}`);
            }
            else {
                const index = Math.floor(Math.random() * keys.length)
                const key = keys[index]
                const restau = restaurants[key]

                if (msg.channel.type === 'dm') {
                    msg.reply(`${msg.author.username}, tu peux manger chez ${restau.name} pour ${restau.budget}€`);
                }
                else {
                    msg.reply(`, tu peux manger chez ${restau.name} pour ${restau.budget}€`);
                }
            }
        });
    }

    if (str == "foodrhelp") {
        db.getHelp((help) => {
            msg.reply(help);
        })
    }
});


client.login(process.env.TOKEN);
