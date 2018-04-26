const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
} = graphql;

const OrderDetailType = require('../../src/types/order-detail');
const OrderType = require('../../src/types/order');
const ProductType = require('../../src/types/product');

const dataFixture = require('../data-fixtures/order');
let createdId;
let createdProductId;

describe('Order Detail Type', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response._id;

                    dataFixture.getFirstDetailByOrderId(createdId)
                        .then(detail => {
                            createdProductId = detail.productId;
                            done(err);
                        });
                });
        });
    });

    it('Should have id field of type ID', function () {
        expect(OrderDetailType.getFields()).to.have.property('id');
        expect(OrderDetailType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have quantity field of type Int', function () {
        expect(OrderDetailType.getFields()).to.have.property('quantity');
        expect(OrderDetailType.getFields().quantity.type).to.deep.equals(GraphQLInt);
    });

    it('Should have orderId field of type ID', function () {
        expect(OrderDetailType.getFields()).to.have.property('orderId');
        expect(OrderDetailType.getFields().orderId.type).to.deep.equals(GraphQLID);
    });

    it('Should have order field of type Order', function () {
        expect(OrderDetailType.getFields()).to.have.property('order');
        expect(OrderDetailType.getFields().order.type).to.deep.equals(OrderType);
    });

    it('Should have productId field of type ID', function () {
        expect(OrderDetailType.getFields()).to.have.property('productId');
        expect(OrderDetailType.getFields().productId.type).to.deep.equals(GraphQLID);
    });

    it('Should have product field of type Product', function () {
        expect(OrderDetailType.getFields()).to.have.property('product');
        expect(OrderDetailType.getFields().product.type).to.deep.equals(ProductType);
    });

    it('Should resolve order', function (done) {
        OrderDetailType.getFields().order.resolve({ orderId: createdId }, null)
            .then(response => {
                expect(response).to.have.property('_id');
                expect(response._id.toString()).to.deep.equals(createdId.toString());
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should resolve product', function (done) {
        OrderDetailType.getFields().product.resolve({ productId: createdProductId }, null)
            .then(response => {
                expect(response).to.have.property('_id');
                expect(response._id.toString()).to.deep.equals(createdProductId.toString());
                done();
            })
            .catch(e => {
                done(e);
            });
    });
});