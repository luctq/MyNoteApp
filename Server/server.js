const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const users = {
  username: "password",
};

const app = express();
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("Hello App!");
});

app.post("*", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.json({ status: 0, mes: "Username or password error!" });
  }
  if (!users[username]) {
    return res.json({ status: 0, mes: "User does not exist!" });
  }
  if (users[username] !== password) {
    return res.json({ status: 0, mes: "Incorrect password!" });
  }
  return res.json({ status: 1, mes: "Login success!", token: "12345678" });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
