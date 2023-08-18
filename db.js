const Database = require("better-sqlite3")

const db = Database("hotel.sqlite")

db.exec(
    "CREATE TABLE IF NOT EXISTS hotels (id INTEGER PRIMARY KEY, name TEXT, price INTEGER)"
)

module.exports = db
