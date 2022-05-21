const siteRouter = require('./site')
const syncRouter = require('./sync')
const shareRouter = require('./share')

module.exports = (app) => {
  app.use('/', siteRouter)
  app.use('/sync', syncRouter)
  app.use('/share', shareRouter)
}