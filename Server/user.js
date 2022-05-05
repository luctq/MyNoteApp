import express from 'express';
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
const user = express.Router();

user.post('/signup', (req, res) => {
  createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .catch((error) => res.send(error))
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(user);
      res
        .cookie('auth', true, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        })
        .send('success');
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
      console.log(user);
      res
        .cookie('auth', true, {
          maxAge: 1000 * 60 * 60,
          httpOnly: true,
        })
        .send('success');
    })
    .catch((error) => {
      res.send(error);
    });
});

user.get('/signout', (req, res) => {
  signOut(auth)
    .then(() => {
      res.clearCookie('auth').send('success');
    })
    .catch((error) => res.send(error));
});

export { user };
