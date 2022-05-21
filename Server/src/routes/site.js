const express = require('express')

const siteController = require('../app/controllers/SiteController')
const accessDataMiddleware = require('../app/middleWares/AccessDataMiddleware')

const router = express.Router()

router.post('/login', siteController.login)
router.post('/register', siteController.register)
router.get('/logout', accessDataMiddleware.checkLogin, siteController.logout)

module.exports = router