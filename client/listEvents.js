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


// Hilfsfunktion zum Sortieren nach Uhrzeit
// Array sortieren mit: array_variable.sort(compareEventTime)
function compareEventTime(ev1, ev2) {
    let time1 = Date.parse(ev1.startTime);
    let time2 = Date.parse(ev2.startTime);
    return (time1 - time2);
}
