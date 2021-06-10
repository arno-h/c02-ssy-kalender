const express = require('express');
const Axios = require('axios');
const axios = Axios.create({validateStatus: null});
const db = require('./database');
const Calendar = require('./Calendar');

const router = express.Router();

router.get('/', getAllCalendars);
router.post("/", createCalendar);
router.get('/:calendarId', getSingleCalendar);

let calendarCollection = db.getCollection('calendars');

function getAllCalendars(request, response) {
    let calendars = calendarCollection.find();
    response.json(calendars);
}

function getSingleCalendar(request, response) {
    let calendarId = request.params.calendarId;
    let calendar = calendarCollection.get(calendarId);
    response.json(calendar);
}

async function createCalendar(request, response) {
    const user = request.body.owner;
    let newCalendar = new Calendar(request.body.name, user);
    calendarCollection.insert(newCalendar);

    // wir ignorieren die Antwort & mögliche Fehler
    await axios.patch(
        'http://localhost:3000/users/' + user,
        { calendar: newCalendar.$loki }
    );

    response.json(newCalendar);
}

module.exports = router;
