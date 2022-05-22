const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const session = require('express-session')

const db = require('./config/NoteDB')
const route = require('./routes')

const SequelizeStore = require('connect-session-sequelize')(session.Store)

dotenv.config()

const {
  PORT,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  SESS_REMOVE_DB_TIME,
} = process.env
const corsOptions = {
  origin: ["http://localhost:19006"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
}

db.connectDB()
  .then(async () => {
    const myStore = new SequelizeStore({
      db: db.sequelize,
      tableName: 'sessions',
      checkExpirationInterval: parseInt(SESS_REMOVE_DB_TIME) * 60 * 60 * 1000,
    })
    await myStore.sync()

    const app = express()

    app.use(express.static('public'))
    app.use(cors(corsOptions));
    app.use(
      express.urlencoded({
        extended: true,
      })
    )
    app.use(express.json({
      limit: '25mb'
    }))
    app.use(
      session({
        name: SESS_NAME,
        resave: false,
        store: myStore,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
          maxAge: parseInt(SESS_LIFETIME) * 60 * 60 * 1000,
          sameSite: true,
          secure: false,
          httpOnly: false,
        }
      })
    )

    route(app)

    app.listen(PORT, () => {
      console.log(`--------->Server running at http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
    console.log('--------->SERVER_ERROR!')
  })