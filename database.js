var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyBr07l2YU1TruCveOnxhGX5E4nVxET8i9A",
    authDomain: "foodr-4c359.firebaseapp.com",
    databaseURL: "https://foodr-4c359.firebaseio.com",
    projectId: "foodr-4c359",
    storageBucket: "foodr-4c359.appspot.com",
    messagingSenderId: "453351847109",
    appId: "1:453351847109:web:0e2de7db12fe1266016cac"
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

export default { addRestaurant, getRestaurants, updateRestaurants, setHelp, getHelp }