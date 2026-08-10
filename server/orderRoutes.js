const express = require("express");
const db = require("./db");
const authMiddleware = require("./authMiddleware");

const router = express.Router();

// CREATE ORDER + ORDER ITEMS
router.post("/", authMiddleware, async (req, res) => {
  const { total, status, items } = req.body;

  const userId = req.user.id;

  if (!total) {
    return res.status(400).json({
      message: "total is required",
    });
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Order items are required",
    });
  }

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      `
      INSERT INTO orders (user_id, total, status)
      VALUES ($1, $2, $3)
      RETURNING id
      `,
      [userId, total, status || "Pending"]
    );

    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `
        INSERT INTO order_items
        (order_id, food_name, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [
          orderId,
          item.name,
          Number(item.quantity) || 1,
          Number(item.price),
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "Order created successfully",
      orderId,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Create order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  } finally {
    client.release();
  }
});

// READ LOGGED-IN USER ORDERS
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await db.query(
      `
      SELECT
        orders.*,
        users.name AS user_name,
        users.email
      FROM orders
      JOIN users
        ON orders.user_id = users.id
      WHERE orders.user_id = $1
      ORDER BY orders.id DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Read orders error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// READ ONE ORDER + ITEMS
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const orderResult = await db.query(
      `
      SELECT
        orders.*,
        users.name AS user_name,
        users.email
      FROM orders
      JOIN users
        ON orders.user_id = users.id
      WHERE orders.id = $1
        AND orders.user_id = $2
      `,
      [id, userId]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const itemsResult = await db.query(
      `
      SELECT *
      FROM order_items
      WHERE order_id = $1
      ORDER BY id ASC
      `,
      [id]
    );

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error("Read order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  }
});

// UPDATE ORDER
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;
  const userId = req.user.id;

  if (!total || !status) {
    return res.status(400).json({
      message: "total and status are required",
    });
  }

  try {
    const result = await db.query(
      `
      UPDATE orders
      SET total = $1,
          status = $2
      WHERE id = $3
        AND user_id = $4
      RETURNING id
      `,
      [total, status, id, userId]
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
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await db.query(
      `
      DELETE FROM orders
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [id, userId]
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