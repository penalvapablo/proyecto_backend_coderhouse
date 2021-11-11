const products = require('../components/products');
const cart = require('../components/cart');

module.exports = (app) => {
  cart(app);
  products(app);
  app.get('*', (req, res) =>
  res.status(404).json({
    error: -2,
    description: `ruta ${req.originalUrl} método get no implementado`,
  })
);
};
