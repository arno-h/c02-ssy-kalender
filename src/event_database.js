const Loki = require("lokijs");
const Event = require('./Event');

const db = new Loki('events.json');
const events = db.addCollection('events');

events.insert(new Event(
    1,
    "Treffen mit Klaus",
    "Nordpol",
    new Date("2017-12-24 18:00:00"),
    [1, 2]
));

events.insert(new Event(
    1,
    "Ausschlafen",
    "Couch",
    new Date("2017-12-26 14:00:00"),
    [1]
));

module.exports = db;
