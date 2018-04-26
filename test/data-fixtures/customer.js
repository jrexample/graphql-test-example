const Customer = require('../../src/models/customer');

function getNewData() {
    const data = {
        name: 'Jacky Rusly',
        age: 23
    };

    return data;
}

function getTestData() {
    const customer = new Customer(getNewData());
    return customer.save()
        .then(response => {
            return Customer.findById(response._id);
        });
}

module.exports = {
    getNewData,
    getTestData,
};
