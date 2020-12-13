# Kalender-Beispiel

Ein einfaches Kalender-Service, das in der Lage ist, ein- oder mehrere Kalender
zu verwalten. Es besteht aus drei **getrennten** Services, die nicht gegenseitig
auf ihre Datenbanken zugreifen können: einem User-Service, einem Kalender-Service
und einem Event-Service.

Zwar laufen alle Services im selben NodeJS-Server, aber das ist aber nur eine
Vereinfachung für das Starten/Stoppen etc. im Beispiel. Behandeln Sie die
Services so, als wären sie völlig voneinander getrennt, auf verschiedenen Rechnern.

## Aufgaben

Hinweise:
 
* generell lassen wir die Fehler-Behandlungen weg, es sei denn,
  es ist explizit in der Aufgabenstellung gefordert.
* Achten Sie darauf in der Datenbank passende Objekte zu haben,
  aber über die Schnittstelle nur IDs zu verarbeiten.
* Typischerweise retournieren Funktionen die betreffende Ressource(n)
  (trifft sowohl auf GET als auch auf POST/DELETE/PATCH zu).
 
### Basis-Funktionen

* Funktionen/Endpunkte für **User-Service**:
  * `GET /users/` ... alle Personen auflisten
  * `GET /users/17` ... eine Person auslesen
  * `POST /users/` ... neue Person anlegen; Daten/Parameter:
    * `name` ... Name der Person
  * `PATCH /users/17` ... wir "missbrauchen" PATCH, um einen neuen Kalender hinzuzufügen;
    (Wagemutige können ja versuchen einen Teil von RFC 6902 umzusetzen :o)
    Daten/Parameter:
    * `calendar` ... ID des Kalenders

* Funktionen/Endpunkte für **Kalender-Service**:
  * `GET /calendars/` ... alle Kalender auflisten
  * `GET /calendar/13` ... einen Kalender auslesen
  * `POST /calendar/` ... neuen Kalender anlegen;
   Daten/Parameter:
    * `name` ... Names des Kalenders
    * `owner` ... User-ID der Eigentümer_in des Kalenders;
                  es soll auch gleich per PATCH des User-Services
                  der neu erzeugte Kalender beim User-Objekt eingetragen werden.

* Funktionen/Endpunkte für **Event-Service**:
  * `GET /events/` ... alle Ereignisse auflisten
  * `GET /events/16` ... ein Ereignis auslesen
  * `POST /events/` ... neues Ereignis anlegen; Daten/Parameter:
    * `calendar` ... ID des Kalenders
    * `name` ... Titel des Ereignisses
    * `place` ... Ort (nur ein String)
    * `startTime` ... Startzeit; erzeugen Sie ein Date-Objekt aus dem String: `new Date(startTime)`
    * `participants` ... Array von User-IDs
  
  
### Erweiterte Such-Funktionen

* Für Personen:
  * `GET /users/?name=Hans` ... Retourniert User-Objekte, deren Name `Hans` ist;
    Tipps:
    * den Query-Parameter können Sie mit `request.query.name` abfragen
    * Sie können mit `if (typeof var === 'undefined')` abfragen, ob die
      Variable in der URL gesetzt ist
    * nützen Sie die where()-Funktion der Datenbank

* Für Ereignisse:    
  * `GET /events/?participant=13` ... Listet alle Events auf, an denen die Person
    mit ID=13 teilnimmt; Tipps:
    * nützen Sie die where()-Funktion der Datenbank
    * Arrays haben eine Funktion `includes()`,
      z.B. `[1,2,3].includes(2) == true`
   
  
### Client

Schreiben Sie einen Client `listEvents.js`, der folgende Schritte ausführt:

Zeigt alle Ereignisse für die Person an, deren Name als Kommandozeilen-Parameter
übergeben wird. Die Ereignisse sollen chronologisch sortiert sein und folgendes
Format haben:

```
2017-12-24T17:00:00.000Z - Treffen mit Klaus @ Nordpol
2017-12-26T13:00:00.000Z - Ausschlafen @ Couch
```

Sie sollten einen Fehlerfall abfangen: nämlich, dass die Namenssuche
keinen Treffer in der Datenbank liefert. 

## Lösung

Im Branch loesung finden Sie die Lösung schrittweise ausprogrammiert.
Schauen Sie sich die Commits einzeln an, um eine Idee für das schrittweise
Vorgehen zu erhalten.
