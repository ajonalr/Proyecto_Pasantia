const soloGet = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  return res.status(403).json({ error: 'Usted NO tiene este permiso' });
};

module.exports = { soloGet }; 