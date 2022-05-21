import express from 'express';
import { db } from './firebase.js';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { collection, addDoc, getDocs } from 'firebase/firestore';
const user = express.Router();

const validateSignUp = (req, res, next) => {
  let error = { username: '', password: '' };
  const { username, password, confirmPassword } = req.body;
  //username
  if (username.trim().length === 0 || username === null) {
    error = { ...error, username: 'Bắt buộc phải có tên người dùng.' };
  } else if (username.trim().length < 6) {
    error = { ...error, username: 'Tên người dùng phải có ít nhất 6 kí tự.' };
  }

  //password
  if (password.trim().length === 0 || password === null) {
    error = { ...error, password: 'Bắt buộc phải có mật khẩu.' };
  } else if (password.trim().length < 6) {
    error = { ...error, password: 'Mật khẩu phải có ít nhất 6 kí tự.' };
  } else if (password !== confirmPassword) {
    error = { ...error, password: 'Nhập lại mật khẩu không đúng.' };
  } else {
    let upperCaseCount = 0;
    let lowerCaseCount = 0;
    let numberCount = 0;
    for (let i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57)
        numberCount++;
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90)
        upperCaseCount++;
      if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)
        lowerCaseCount++;
    }
    if (upperCaseCount === 0) {
      error = { ...error, password: 'Cần ít nhất 1 chữ cái viết hoa.' };
    } else if (lowerCaseCount === 0) {
      error = { ...error, password: 'Cần ít nhất 1 chữ cái viết thường.' };
    } else if (numberCount === 0) {
      error = { ...error, password: 'Cần ít nhất 1 chữ số.' };
    }
  }

  if (error.username !== '' || error.password !== '') {
    res.send(error);
  } else {
    next();
  }
};

const validateSignIn = (req, res, next) => {
  let error = { username: '', password: '' };
  const { username, password } = req.body;
  //username
  if (username.trim().length === 0 || username === null) {
    error = { ...error, username: 'Bắt buộc phải có tên người dùng.' };
  }

  //password
  if (password.trim().length === 0 || password === null) {
    error = { ...error, password: 'Bắt buộc phải có mật khẩu.' };
  }

  if (error.password !== '' && error.username !== '') {
    res.send(error);
  }

  next();
};

const encryptPassword = async (req, res, next) => {
  const salt = await bcrypt.genSalt();
  req.body.password = await bcrypt.hash(req.body.password, salt);
  next();
};

user.post('/signup', [validateSignUp, encryptPassword], async (req, res) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      username: req.body.username,
      password: req.body.password,
    });
    const user = { username: req.body.username, userId: docRef.id };
    const token = generateToken(user);
    res.send(token);
  } catch (e) {
    console.error(e);
  }
});

user.post('/signin', validateSignIn, async (req, res) => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let hasAccount = false;
  querySnapshot.forEach(async (doc) => {
    if (doc.data().username === req.body.username) {
      hasAccount = true;
      const correctPassword = await bcrypt.compare(
        req.body.password,
        doc.data().password
      );
      if (correctPassword) {
        const user = { username: req.body.username, userId: doc.id };
        const token = generateToken(user);
        res.send(token);
      } else {
        res.send('Sai mật khẩu.');
      }
    }
  });
  if (!hasAccount) {
    res.send('Tài khoản không tồn tại.');
  }
});

const generateToken = (user) => {
  return jwt.sign(user, 'access_top_secret', { expiresIn: '30m' });
};

export { user };
