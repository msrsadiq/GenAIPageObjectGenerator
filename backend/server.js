const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { initDB } = require("./config/db");

const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Start DB and Server
initDB().then(() => {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
});
