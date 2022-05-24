# MyNoteApp
This is note app. 
#Install
```bash
- Install Expo Go App
- git clone 
```
#Configuration
```bash
- create database in MySQL with name: 'notes'
- Fix in MyNote/Client/src/redux/serverApi.js:
+ When run "expo start", has a line: › Metro waiting on exp://10.0.0.26:19000
+ edit line in file:  export const serverApi = 'http://192.168.223.58:8080' => export const serverApi = 'http:///10.0.0.26:8080'
- MyNote/ServerOther/src/config/NoteDB.js
+ edit line in file: module.exports = new NoteDB('notes', 'root', null) ->  module.exports = new NoteDB('notes', your username of Mysql, your password of Mysql)
```
#Run code
```bash
- cd Client
  + npm i
  + expo start
- use Expo scan QR
- cd ServerOther
  + npm i
  + npm start
```
