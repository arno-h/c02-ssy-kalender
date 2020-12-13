class User {
    constructor(name) {
        this.name = name;
        this.calendars = [];
    }

    addCalendar(calendar) {
        this.calendars.push(calendar);
    }
}

module.exports = User;
