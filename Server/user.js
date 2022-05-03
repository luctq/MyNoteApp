import express from 'express';
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
const user = express.Router();

user.post('/signup', (req, res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .catch((error) => res.send(error))
    .then((userCredentials) => {
      const user = userCredentials.user;
      res.cookie('auth', true, { expires: new Date(Date.now() + 3600000) });
      res.send('success');
    })
    .catch((error) => {
      res.send(error);
    });
});

user.post('/signin', (req, res) => {
  signInWithEmailAndPassword(auth, req.body.email, req.body.password)
    .catch((error) => {
      res.send(error);
    })
    .then((userCredentials) => {
      const user = userCredentials.user;
      res.cookie('auth', true, { expires: new Date(Date.now() + 3600000) });
      res.send('success');
    })
    .catch((error) => {
      res.send(error);
    });
});

export { user };
