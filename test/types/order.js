const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const OrderType = require('../../src/types/order');
const OrderDetailType = require('../../src/types/order-detail');
const CustomerType = require('../../src/types/customer');

const dataFixture = require('../data-fixtures/order');
let createdId;
let createdCustomerId;

describe('Order Type', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response._id;
                    createdCustomerId = response.customerId;
                    done(err);
                });
        });
    });

    it('Should have id field of type ID', function () {
        expect(OrderType.getFields()).to.have.property('id');
        expect(OrderType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have dateOrdered field of type Date', function () {
        expect(OrderType.getFields()).to.have.property('dateOrdered');
        expect(OrderType.getFields().dateOrdered.type).to.deep.equals(GraphQLDate);
    });

    it('Should have customerId field of type ID', function () {
        expect(OrderType.getFields()).to.have.property('customerId');
        expect(OrderType.getFields().customerId.type).to.deep.equals(GraphQLID);
    });

    it('Should have customer field of type Float', function () {
        expect(OrderType.getFields()).to.have.property('customer');
        expect(OrderType.getFields().customer.type).to.deep.equals(CustomerType);
    });

    it('Should have details field of type List of Order Detail', function () {
        expect(OrderType.getFields()).to.have.property('details');
        expect(OrderType.getFields().details.type).to.deep.equals(new GraphQLList(OrderDetailType));
    });

    it('Should resolve customer', function (done) {
        OrderType.getFields().customer.resolve({ customerId: createdCustomerId }, null)
            .then(response => {
                expect(response).to.have.property('id');
                expect(response._id.toString()).to.deep.equals(createdCustomerId.toString());
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should resolve order details', function (done) {
        OrderType.getFields().details.resolve({ id: createdId }, null)
            .then(response => {
                expect(response).to.be.array();
                expect(response.length).to.be.above(0);
                done();
            })
            .catch(e => {
                done(e);
            });
    });
});