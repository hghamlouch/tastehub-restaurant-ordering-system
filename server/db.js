const { Pool } = require("pg");

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("users table ready");

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_user
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE
      );
    `);

    console.log("orders table ready");

    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        food_name VARCHAR(150),
        quantity INTEGER DEFAULT 1,
        price DECIMAL(10, 2),
        CONSTRAINT fk_order
          FOREIGN KEY (order_id)
          REFERENCES orders(id)
          ON DELETE CASCADE
      );
    `);

    console.log("order_items table ready");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

db.connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database");
    client.release();

    createTables();
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

module.exports = db;