const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = graphql;

const CustomerType = require('../../src/types/customer');
const OrderType = require('../../src/types/order');

const dataFixture = require('../data-fixtures/order');
let createdId;

describe('Customer Type', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response.customerId;
                    done(err);
                });
        });
    });

    it('Should have id field of type ID', function () {
        expect(CustomerType.getFields()).to.have.property('id');
        expect(CustomerType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have name field of type String', function () {
        expect(CustomerType.getFields()).to.have.property('name');
        expect(CustomerType.getFields().name.type).to.deep.equals(GraphQLString);
    });

    it('Should have age field of type Int', function () {
        expect(CustomerType.getFields()).to.have.property('age');
        expect(CustomerType.getFields().age.type).to.deep.equals(GraphQLInt);
    });

    it('Should have orders field of type List of OrderType', function () {
        expect(CustomerType.getFields()).to.have.property('orders');
        expect(CustomerType.getFields().orders.type).to.deep.equals(new GraphQLList(OrderType));
    });

    it('Should resolve orders', function (done) {
        CustomerType.getFields().orders.resolve({ id: createdId }, null)
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