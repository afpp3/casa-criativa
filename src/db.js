const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./casa-criativa.db");

db.serialize(function() {
  //Create table
  db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `);

  //Delete datas in table
  // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
  //   if (err) return console.log(err);
  //   console.log("Idéia deletada com sucesso", this);
  // });
});

module.exports = db;
