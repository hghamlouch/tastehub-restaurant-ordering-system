const mysql = require("mysql2");

let db;

if (process.env.DATABASE_URL) {
  db = mysql.createConnection(process.env.DATABASE_URL);
} else {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tastehub_db",
    port: 3306,
  });
}

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to MySQL database");

  // USERS TABLE
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // ORDERS TABLE
  const ordersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    )
  `;

  // ORDER ITEMS TABLE
  const orderItemsTable = `
    CREATE TABLE IF NOT EXISTS order_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      order_id INT NOT NULL,
      food_name VARCHAR(150) NOT NULL,
      quantity INT NOT NULL DEFAULT 1,
      price DECIMAL(10,2) NOT NULL,
      CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
    )
  `;

  db.query(usersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }

    console.log("users table ready");

    db.query(ordersTable, (err) => {
      if (err) {
        console.error("Error creating orders table:", err);
        return;
      }

      console.log("orders table ready");

      db.query(orderItemsTable, (err) => {
        if (err) {
          console.error("Error creating order_items table:", err);
          return;
        }

        console.log("order_items table ready");
      });
    });
  });
});

module.exports = db;