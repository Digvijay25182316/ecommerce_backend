const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
