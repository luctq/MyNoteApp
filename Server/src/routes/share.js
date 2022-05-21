const express = require('express')

const shareDataController = require('../app/controllers/ShareDataController')
const accessDataMiddleware = require('../app/middleWares/AccessDataMiddleware')

const router = express.Router()

router.post('/shareNote', accessDataMiddleware.checkLogin, shareDataController.shareNote)

module.exports = router