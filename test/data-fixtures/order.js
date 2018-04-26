const Order = require('../../src/models/order');
const OrderDetail = require('../../src/models/order-detail');
const customerData = require('./customer');
const productData = require('./product');

function getNewData() {
    return Promise.all([customerData.getTestData(), productData.getTestData(), productData.getTestData()])
        .then(response => {
            const customer = response[0];
            const firstProduct = response[1];
            const secondProduct = response[2];
            const details = [
                {
                    productId: firstProduct._id,
                    quantity: 1,
                },
                {
                    productId: secondProduct._id,
                    quantity: 2,
                }
            ];

            const data = {
                order: {
                    dateOrdered: '1995-01-23',
                    customerId: customer._id,
                },
                details,
            };

            return data;
        });
}

function getTestData() {
    return getNewData()
        .then(response => {
            const order = new Order(response.order);

            return order.save()
                .then(responseOrder => {
                    for (let detail of response.details) {
                        detail.orderId = responseOrder._id;
                    }

                    return OrderDetail.insertMany(response.details)
                        .then(responseOrderDetail => {
                            return Order.findById(responseOrder._id);
                        });
                });
        });
}

function getFirstDetailByOrderId(orderId) {
    return OrderDetail.findOne({ orderId: orderId })
        .then(response => {
            return response;
        });
}

function getDetailsByOrderId(orderId) {
    return OrderDetail.find({ orderId: orderId })
        .then(response => {
            return response;
        });
}

module.exports = {
    getNewData,
    getTestData,
    getFirstDetailByOrderId,
    getDetailsByOrderId,
};
