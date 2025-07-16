const express = require("express");
const db = require("../db");
const router = express.Router();

const getMonthName = (index) =>
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index];

router.get("/summary", async (req, res) => {
  try {
    const { rows: incomeRows } = await db.query(`
      SELECT EXTRACT(MONTH FROM payment_date) AS month, SUM(amount) AS total
      FROM payments
      GROUP BY month
      ORDER BY month
    `);

    const monthly_chart = incomeRows.map((row) => ({
      month: getMonthName(row.month - 1),
      total: parseFloat(row.total),
    }));

    const { rows: monthIncome } = await db.query(`
      SELECT SUM(amount) AS total FROM payments
      WHERE DATE_TRUNC('month', payment_date) = DATE_TRUNC('month', CURRENT_DATE)
    `);

    const { rows: unpaid } = await db.query(`
      SELECT COUNT(*) FROM tenants t
      WHERE NOT EXISTS (
        SELECT 1 FROM payments p
        WHERE p.tenant_id = t.id
          AND DATE_TRUNC('month', p.payment_date) = DATE_TRUNC('month', CURRENT_DATE)
      )
    `);

    const { rows: tenants } = await db.query(`SELECT COUNT(*) FROM tenants`);

    res.json({
      monthly_chart,
      month_income: parseFloat(monthIncome[0].total || 0),
      unpaid_count: parseInt(unpaid[0].count),
      tenant_count: parseInt(tenants[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Summary error" });
  }
});

module.exports = router;
