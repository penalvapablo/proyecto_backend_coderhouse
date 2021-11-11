const { Router } = require('express');
const router = new Router();
const carts  = require('../../utils/clases/Carts')
const inventory = require('../../utils/clases/Inventory');;

const Storage = require('../../storage/ProductStorage');
const storage = new Storage(  './storage/carts.txt')
const cartStorage = [];
storage.read().then((data) => {
  data.forEach((cart) => {
    const {
      name,
      description,
      code,
      img,
      price,
      stock,
      id,
      timestamp,
    } = cart;
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
    cartStorage.push(newProduct);
  });
});



module.exports = (app) => {
  app.use('/api/cart', router);

  router.post('/', (req, res) => {
    const newCartId = carts.createCart()
    storage.save(carts.carts);
    res.json(newCartId)

  });

  router.delete('/:id', (req, res) => {
    const cart = carts.deleteCart(
      Number(req.params.id)
    );
    if (!cart) {
      return res.json({ error: 'este carrito no existe' });
    }
    storage.save(carts.carts);
    res.json(cart);
  });

  router.get('/:id/products', (req, res)=>{
    const products = carts.listProducts( Number(req.params.id))
    if(products.length === 0){
      return res.json({ error: 'este carrito no existe' });
    }
    res.json(products)
  })
  
  router.post('/:id/products', (req, res)=>{
    const cartId = Number(req.params.id)
    const { id } = req.body
    const product = inventory.getProduct(id)
    if(!product){
      res.json('no existe el producto')
      return
    }
    carts.addProductToCart(product, cartId)
    storage.save(carts.carts);
    // const products = carts.listProducts( Number(req.params.id))
    res.json('producto agregado')
  })

  router.delete('/:id/products/:id_prod', (req, res)=>{
    const cartId = Number(req.params.id)
    const prodId = Number(req.params.id_prod)
    
    carts.deleteProductFromCart(prodId, cartId)
    storage.save(carts.carts);
    // const products = carts.listProducts( Number(req.params.id))
    res.json('producto eliminado')
  })

};
