const express = require("express");
const db = require("./db");

const router = express.Router();

// CREATE ORDER + ORDER ITEMS
router.post("/", async (req, res) => {
  const { user_id, total, status, items } = req.body;

  if (!user_id || !total) {
    return res.status(400).json({
      message: "user_id and total are required",
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
      [user_id, total, status || "Pending"]
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

// READ ONE ORDER + ITS ITEMS
router.get("/:id", async (req, res) => {
  const { id } = req.params;

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
      `,
      [id]
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
      SET total = $1,
          status = $2
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

  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // This is technically handled by ON DELETE CASCADE,
    // but deleting the order is enough to remove its items.
    const result = await client.query(
      `
      DELETE FROM orders
      WHERE id = $1
      RETURNING id
      `,
      [id]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Order not found",
      });
    }

    await client.query("COMMIT");

    res.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Delete order error:", error);

    res.status(500).json({
      message: "Database error",
    });
  } finally {
    client.release();
  }
});

module.exports = router;