const mysql = require("mysql2");

const db = process.env.DATABASE_URL
  ? mysql.createConnection(process.env.DATABASE_URL)
  : mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "tastehub_db",
      port: 3306,
    });

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to MySQL database");
});

module.exports = db;