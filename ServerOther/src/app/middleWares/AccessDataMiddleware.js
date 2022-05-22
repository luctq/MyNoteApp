class AccessDataMiddleware {

  checkLogin(req, res, next) {
    if (!req.session.userId) {
      return res.json({ status: 0, mes: 'Access denied' })
    }
    next()
  }
}

module.exports = new AccessDataMiddleware

