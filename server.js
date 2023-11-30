const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4560;

app.listen(PORT, (req, res) => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
