const moment = require('moment')

class Carts{
  
  constructor() {
    this.carts=[]
    this.id = 1;
  }
  createCart(id, timestamp, products){
    const newCart = {
      id: id || this.id,
      timestamp: timestamp || moment(new Date()).format('DD/MM/YY HH:mm'),
      products: products || []
    }
    this.carts.push(newCart)
    this.id++
    return newCart.id
  }

  deleteCart(id){
    const index = this.carts.findIndex(cart => cart.id === id)
    if (index === -1) {
      return null;
    }
    const [cartDeleted] = this.carts.splice(index, 1); 
    return cartDeleted;
  }

  listProducts(id){
    const index = this.carts.findIndex(cart => cart.id === id)
    if (index === -1) {
      return null;
    }
    return this.carts[index].products
  }

  addProductToCart(product,cartId){
    const index = this.carts.findIndex(cart => cart.id === cartId)
    if (index === -1) {
      return null;
    }
    this.carts[index].products.push(product)
    return this.carts[index]
  }
  deleteProductFromCart(productId,cartId){
    const indexCart = this.carts.findIndex(cart => cart.id === cartId)
    if (indexCart === -1) {
      return null;
    }
    const cart = this.carts[indexCart]
    const indexProd = cart.products.findIndex(prod => prod.id === productId)
    cart.products.splice(indexProd,1)
    return cart.products
  }
}

module.exports = new Carts()