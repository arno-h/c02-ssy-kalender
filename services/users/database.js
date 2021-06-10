const Loki = require("lokijs");
const User = require('./User');

const db = new Loki('users.json');
const users = db.addCollection('users');

users.insert(new User('Klara'));
users.insert(new User('Klaus'));

module.exports = db;
