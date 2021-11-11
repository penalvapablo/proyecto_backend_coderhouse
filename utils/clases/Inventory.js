const moment = require('moment');
// const ProductStorage = require('../../storage/ProductStorage');
// const productStorage = new ProductStorage('./storage/products.txt')

class Inventory {
  constructor() {
    this.products = [];
    this.id = 1;
  }
 
    addProduct(name, description, code, img, price, stock, id,timestamp ) {
    const newProduct = {
      name,
      description,
      code,
      img,
      price,
      stock,
      id: id || this.id,
      timestamp: timestamp || moment(new Date()).format(
        'DD/MM/YY HH:mm'
      ),
    };
    this.id++;
    this.products.push(newProduct)

    return newProduct;
  }


  getProducts() {
    return this.products;
  }

  getProduct(id) {
    return this.products.find(
      (product) => product.id == id
    );
  }


  updateProduct(
    id,
    name,
    description,
    code,
    img,
    price,
    stock
  ) {
    const index = this.products.findIndex(
      (product) => product.id === id
    );
    if (index === -1) {
      return null;
    }
    this.products[index] = {
      ...this.products[index],
      name,
      description,
      code,
      img,
      price,
      stock,
    };
    // this.id++;
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(
      (product) => product.id === id
    );
    if (index === -1) {
      return null;
    }
    const [productDeleted] = this.products.splice(index, 1);
    return productDeleted;
  }
}

module.exports = new Inventory();
