const Product = require('../../src/models/product');

function getNewData() {
    const data = {
        name: "Tango",
        quantity: 100,
        price: 10000,
        description: 'Delicious Wafer...',
    };

    return data;
}

function getTestData() {
    const product = new Product(getNewData());
    return product.save()
        .then(response => {
            return Product.findById(response._id);
        });
}

module.exports = {
    getNewData,
    getTestData,
};
