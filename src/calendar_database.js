const Loki = require("lokijs");
const Calendar = require('./Calendar');

const db = new Loki('calendars.json');
const calendars = db.addCollection('calendars');

let klaraCalendar = new Calendar('Klaras Kalender', 1);
calendars.insert(klaraCalendar);

module.exports = db;
