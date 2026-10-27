const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "express")));
app.get("/health", (req, res) => res.json({ status: "ok" }));
const server = app.listen(port, () =>
  console.log(`Website: http://localhost:${port}`),
);
server.on("error", (error) => {
  console.error(
    error.code === "EADDRINUSE"
      ? `Port ${port} is busy. Close the other server or set PORT.`
      : error.message,
  );
  process.exitCode = 1;
});
