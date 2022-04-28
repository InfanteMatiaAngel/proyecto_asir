const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('login.db', function(error) {
    if (error != null) {
        console.log('Fallo al abrir bd', error);
        process.exit(1);
    }
});

const anatraz = new sqlite3.Database('anatraz.db', function(error) {
    if (error != null) {
        console.log('Fallo al abrir bd', error);
        process.exit(1);
    }
});

module.exports = db
module.exports = anatraz