import express from 'express';
const note = express.Router();
import { db } from './firebase.js';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';

export { note };
