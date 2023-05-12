module.exports = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mycontacts-frontend-matheus-aurelio.vercel.app');
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Max-Age', '120');
  next();
};
