const inventory = require('../../utils/clases/Inventory');
const { Router } = require('express');
const router = new Router();
let admin = true;

//STORAGE
const ProductStorage = require('../../storage/ProductStorage');
const productStorage = new ProductStorage(
  './storage/products.txt'
);
const products = [];
productStorage.read().then((data) => {
  data.forEach((product) => {
    const {
      name,
      description,
      code,
      img,
      price,
      stock,
      id,
      timestamp,
    } = product;
    const newProduct = inventory.addProduct(
      name,
      description,
      code,
      img,
      price,
      stock,
      id,
      timestamp
    );
    products.push(newProduct);
  });
});


module.exports = (app) => {
  app.use('/api/products', router);

  router.get('/', (req, res) => {
    // getProductsFromStorage()
    const products = inventory.getProducts();
    if (!products.length) {
      return res.json({
        error: 'no hay productos cargados',
      });
    }
    res.json(products);
  });

  router.get('/:id', (req, res) => {
    const producto = inventory.getProduct(req.params.id);
    if (!producto) {
      return res.json({ error: 'producto no encontrado' });
    }
    res.json(producto);
  });

  router.post('/', (req, res) => {
    admin === false &&
      res.json({
        error: -1,
        description: 'ruta y metodo no autorizados',
      });
    const { name, description, code, img, price, stock } =
      req.body;
    const newProduct = inventory.addProduct(
      name,
      description,
      code,
      img,
      price,
      stock
    );
    productStorage.save(inventory.products);
    if (!newProduct)
      return res.json({
        error: 'error al guardar producto',
      });
    res.json('producto guardado');
  });

  router.put('/:id', (req, res) => {
    admin === false &&
      res.json({
        error: -1,
        description: 'ruta y metodo no autorizados',
      });
    const { name, description, code, img, price, stock } =
      req.body;

    const product = inventory.updateProduct(
      Number(req.params.id),
      name,
      description,
      code,
      img,
      price,
      stock
    );
    if (!product) {
      return res.json({ error: 'producto no encontrado ' });
    }
    productStorage.save(inventory.products);
    res.json(product);
  });

  router.delete('/:id', (req, res) => {
    admin === false &&
      res.json({
        error: -1,
        description: 'ruta y metodo no autorizados',
      });
    const product = inventory.deleteProduct(
      Number(req.params.id)
    );
    if (!product) {
      return res.json({ error: 'producto no encontrado' });
    }
    productStorage.save(inventory.products);
    res.json(product);
  });
};
