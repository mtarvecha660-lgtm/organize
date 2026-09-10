const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "server", "uploads")));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "resource-organizer-api" });
});

app.use("/api", routes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
