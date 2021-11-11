const fs = require('fs');

module.exports = class Storage {
  constructor(filesystemPath) {
    this.file = filesystemPath;
  }

  async save(product) {
    try {
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(product, null, '\t')
      );
    } catch (error) {
      throw new Error('Error al guardar.');
    }
  }
  async read() {
    try {
      const content = await fs.promises.readFile(this.file);
      const products = JSON.parse(content);
      return products;
    } catch (error) {
      return []
    }
  }
};
