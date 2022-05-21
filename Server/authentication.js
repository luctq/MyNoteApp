const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === undefined) res.sendStatus(401);

  jwt.verify(token, 'access_top_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export { authenticateToken };
