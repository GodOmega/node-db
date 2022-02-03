const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class ProductsService {

  constructor(){
    // this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct =  await models.Product.create(data);
    return newProduct;
  }

  async find(query) {

    const { limit, offset, price_min, price_max } = query

    const options = {
      include: ['category'],
      where: {}
    }

    if(limit && offset) {
      options.limit = +limit;
      options.offset = +offset;
    }

    if(price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    if (!product) {
      throw boom.notFound('product not found');
    }
    product = await models.Product.update(changes)
    return product;
  }

  async delete(id) {
    const product = await this.findOne(id)
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
