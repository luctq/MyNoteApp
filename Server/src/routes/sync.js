const express = require('express')

const syncDataController = require('../app/controllers/SyncDataController')
const accessDataMiddleware = require('../app/middleWares/AccessDataMiddleware')

const router = express.Router()

router.post('/uploadData', accessDataMiddleware.checkLogin, syncDataController.uploadData)
router.get('/downloadData', accessDataMiddleware.checkLogin, syncDataController.downloadData)
router.post('/createNewNote', accessDataMiddleware.checkLogin, syncDataController.createNewNote)
router.post('/deleteNote', accessDataMiddleware.checkLogin, syncDataController.deleteNote)
router.post('/restoreNote', accessDataMiddleware.checkLogin, syncDataController.restoreNote)
router.post('/updateNote', accessDataMiddleware.checkLogin, syncDataController.updateNote)
router.post('/restoreNote', accessDataMiddleware.checkLogin, syncDataController.restoreNote)
router.post('/createNewFolder', accessDataMiddleware.checkLogin, syncDataController.createNewFolder)
router.post('/deleteFolder', accessDataMiddleware.checkLogin, syncDataController.deleteFolder)
router.post('/restoreFolder', accessDataMiddleware.checkLogin, syncDataController.restoreFolder)


module.exports = router