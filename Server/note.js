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

note.post('/addNote', async (req, res) => {
  const docRef = await addDoc(collection(db, 'notes'), {
    content: req.body.content,
    folderId: req.body.folderId,
  });
  res.send(`Document written with ID: ${docRef.id}`);
});

note.post('/updateNote', async (req, res) => {
  const docRef = await updateDoc(doc(db, 'notes', req.body.noteId), {
    content: req.body.content,
  });
  res.send(`Document updated with ID: ${docRef.id}`);
});

note.get('/getNote', async (req, res) => {
  const docSnap = await getDoc(doc(db, 'notes', req.body.noteId));
  res.send(docSnap.data().content);
});

note.get('/deleteNote', async (req, res) => {
  await deleteDoc(doc(db, 'notes', req.body.noteId));
});

export { note };
