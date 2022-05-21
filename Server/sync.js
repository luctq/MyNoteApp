import { async } from '@firebase/util';
import express from 'express';
import { collection, getDoc, getDocs, writeBatch } from 'firebase/firestore';
import { authenticateToken } from './authentication.js';
import { db } from './firebase.js';
const sync = express.Router();

const foldersCollection = collection(db, 'folders');
const notesCollection = collection(db, 'notes');
const batch = writeBatch(db);

sync.post('/uploadData', authenticateToken, async (req, res) => {
  const notes = req.body.notes;
  const folders = req.body.folders;
  notes.forEach((note) => {
    const newNote = { ...note, userId: req.user.userId };
    let docRef = notesCollection.doc();
    batch.set(docRef, newNote);
  });
  folders.forEach((folder) => {
    const newFolder = { ...folder, userId: req.user.userId };
    let docRef = foldersCollection.doc();
    batch.set(docRef, newFolder);
  });
  await batch.commit();
});

sync.get('/downloadData', authenticateToken, async (req, res) => {
  const notes = [];
  const folders = [];
  const notesDocs = await getDocs(notesCollection);
  const foldersDocs = await getDoc(foldersCollection);
  notesDocs.forEach((doc) => {
    if (doc.data().userId == req.user.userId) {
      notes.push(doc);
    }
  });
  foldersDocs.forEach((doc) => {
    if (doc.data().userId == req.user.userId) {
      folders.push(doc);
    }
  });
  res.send({ notes, folders });
});

export { sync };
