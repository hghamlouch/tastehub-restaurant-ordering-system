const express = require("express");
const db = require("./db");

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  const { user_id, total, status } = req.body;

  if (!user_id || !total) {
    return res.status(400).json({
      message: "user_id and total are required",
    });
  }

  try {
    const result = await db.query(
      `
      INSERT INTO orders (user_id, total, status)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [user_id, total, status || "Pending"]
    );

    res.status(201).json({
      message: "Order created successfully",
      orderId: result.rows[0].id,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// READ ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        orders.*,
        users.name AS user_name,
        users.email
      FROM orders
      JOIN users
        ON orders.user_id = users.id
      ORDER BY orders.id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Read orders error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// READ ONE ORDER
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "SELECT * FROM orders WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Read order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// UPDATE ORDER
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;

  if (!total || !status) {
    return res.status(400).json({
      message: "total and status are required",
    });
  }

  try {
    const result = await db.query(
      `
      UPDATE orders
      SET total = $1, status = $2
      WHERE id = $3
      RETURNING id
      `,
      [total, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order updated successfully",
    });
  } catch (error) {
    console.error("Update order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `
      DELETE FROM orders
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Delete order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

module.exports = router;