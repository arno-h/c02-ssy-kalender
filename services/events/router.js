const express = require('express');
const db = require('./database');
const Event = require('./Event');

const router = express.Router();

router.get('/', getAllEvents);
router.post("/", createEvent);
router.get('/:eventId', getSingleEvent);

let eventCollection = db.getCollection('events');

function getAllEvents(request, response) {
    let events = eventCollection.find();
    response.json(events);
}

function getSingleEvent(request, response) {
    let eventId = request.params.eventId;
    let event = eventCollection.get(eventId);
    response.json(event);
}

function createEvent(request, response) {
    let calendar = calendarCollection.get(request.body.calendar);
    let event = new Event(
        calendar,
        request.body.name,
        request.body.place,
        request.body.startTime,
        request.body.participants
    );
    eventCollection.insert(event);
    response.json(event);
}

module.exports = router;
