const express = require("express");
const cors = require("cors");
const landlordRoutes = require("./routes/landlord");
const dashboardRoutes = require("./routes/dashboard"); // 👈 NEW line added

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/landlord", landlordRoutes);
app.use("/api/dashboard", dashboardRoutes); // 👈 NEW line added

app.get("/", (req, res) => res.send("Backend is running"));

app.listen(PORT, () => console.log("Server running on port", PORT));
