const express = require("express");
const db = require("./db");

const router = express.Router();

// CREATE ORDER
router.post("/", (req, res) => {
  const { user_id, total, status } = req.body;

  if (!user_id || !total) {
    return res.status(400).json({
      message: "user_id and total are required"
    });
  }

  const sql =
    "INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)";

  db.query(
    sql,
    [user_id, total, status || "Pending"],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message
        });
      }

      res.status(201).json({
        message: "Order created successfully",
        orderId: result.insertId
      });
    }
  );
});

// READ ALL ORDERS
router.get("/", (req, res) => {
  const sql = `
    SELECT orders.*, users.name AS user_name, users.email
    FROM orders
    JOIN users ON orders.user_id = users.id
    ORDER BY orders.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results);
  });
});

// READ ONE ORDER
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM orders WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Order not found"
        });
      }

      res.json(results[0]);
    }
  );
});

// UPDATE ORDER
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;

  if (!total || !status) {
    return res.status(400).json({
      message: "total and status are required"
    });
  }

  const sql =
    "UPDATE orders SET total = ?, status = ? WHERE id = ?";

  db.query(sql, [total, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      message: "Order updated successfully"
    });
  });
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM orders WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Order not found"
        });
      }

      res.json({
        message: "Order deleted successfully"
      });
    }
  );
});

module.exports = router;