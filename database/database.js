const sqlite3 = require('sqlite3').verbose();

const anatraz = new sqlite3.Database('./database/anatraz.db', function(error) {
    if (error != null) {
        console.log('Fallo al abrir bd', error);
        process.exit(1);
    }
});

module.exports = anatraz