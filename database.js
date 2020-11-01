require('dotenv').config()
var firebase = require('firebase');

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

function addRestaurant(name, budget, completion) {
    database.ref('restaurants/' + name).set({
        name: name,
        budget: budget,
    })
    .then(() => {
        completion()
    })
}

function getRestaurants(completion) {
    database.ref('restaurants').once('value')
    .then((snapshot) => {
        if (snapshot.val()) {
            var restaurants = snapshot.val()
            completion(restaurants)
        }
    })
}

function updateRestaurants(restaurants, completion, error) {
    database.ref('restaurants').update(restaurants)
    .then(() => {
        completion()
    })
    .catch((e) => {
        error(e)
    })
}

function setHelp(help, completion) {
    database.ref('help').set(help, () => {
        completion()
    })
}

function getHelp(completion) {
    database.ref('help').once('value')
    .then((snapshot) => {
        if (snapshot.val()) {
            var help = snapshot.val()
            completion(help)
        }
    })
}

module.exports = { addRestaurant, getRestaurants, updateRestaurants, setHelp, getHelp }