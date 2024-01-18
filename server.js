const app = require("./app");
const PORT = 8080;
app.listen(PORT, (req, res) => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
