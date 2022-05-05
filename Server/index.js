import express, { response } from 'express';
import cookieParser from 'cookie-parser';
import { user } from './user.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/', user);

app.get('/', (req, res) => {
  if (req.cookies.auth) {
    res.send(`found cookie: ${req.cookies.auth} `);
  } else {
    res
      .cookie('hello', 'world', { maxAge: 1000 * 60 })
      .send('cant find cookie');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
