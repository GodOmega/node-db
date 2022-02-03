const { User, UserSchema } = require('./user.model')
const { Customer, CustomerSchema } = require('./customer.model')
const { Category, categorySchema } = require('./category.model')
const { Product, productSchema } = require('./product.model')
const { Order, orderSchema } = require('./orders.model')
const { OrderProduct, orderProductSchema} = require('./order-product.model')

function setupModels(sequelize) {
  // Initialize models
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));

  // Relationships
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
