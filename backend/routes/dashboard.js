const express = require("express");
const router = express.Router();

// Mock stats for dashboard
router.get("/stats", (req, res) => {
  const stats = {
    totalMonthlyIncome: 150000,
    totalUnpaidRent: 25000,
    totalUnits: 12,
    totalTenants: 10,
    rentChartData: [
      { month: "Jan", rent: 12000 },
      { month: "Feb", rent: 14000 },
      { month: "Mar", rent: 10000 },
      { month: "Apr", rent: 16000 },
      { month: "May", rent: 13000 },
      { month: "Jun", rent: 15000 },
    ],
  };
  res.json(stats);
});

module.exports = router;
