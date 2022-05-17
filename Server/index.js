import express from 'express';
import cookieParser from 'cookie-parser';
import { user } from './user.js';
import { note } from './note.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/', user);
app.use('/', note);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
