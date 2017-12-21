const Axios = require('axios');
const axios = Axios.create({validateStatus: null});

const hostUrl = "http://localhost:3000";

// Wir holen uns den Namen von der Kommandozeile
if (process.argv.length < 3) {
    console.log("Starten Sie das Programm als 'npm run listEvents <Personen-Name>'");
    // wir nehmen code=0, weil sonst die lange npm-Fehlermeldung zu Verwirrung führen könnte
    process.exit(0);
}
let user = process.argv[2];


async function listEvents(username) {
    let response = await axios(hostUrl + '/users/?name=' + username);
    const users = response.data;
    if (users.length === 0) {
        console.log('Keine Person mit diesem Namen gefunden.');
        process.exit(0);
    }
    const user = users[0]; // wir nehmen nur erstes Element aus Array
    response = await axios.get(hostUrl + '/events/?participant=' + user.$loki);
    const events = response.data;
    events.sort(compareEventTime);
    for (let event of events) {
        console.log(event.startTime + " - " + event.name + " @ " + event.place);
    }
}

listEvents(user).then();

// Hilfsfunktion zum Sortieren nach Uhrzeit
// Array sortieren mit: array_variable.sort(compareEventTime)
function compareEventTime(ev1, ev2) {
    let time1 = Date.parse(ev1.startTime);
    let time2 = Date.parse(ev2.startTime);
    return (time1 - time2);
}
