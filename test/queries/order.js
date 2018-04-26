const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const OrderQuery = require('../../src/queries/order');
const OrderType = require('../../src/types/order');

const dataFixture = require('../data-fixtures/order');
let createdId;

describe('Order Query', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response._id;
                    done(err);
                });
        });
    });

    it('Should have order query', function () {
        expect(OrderQuery).to.have.property('order');
        expect(OrderQuery.order.type).to.deep.equals(OrderType);
        expect(OrderQuery.order.args).to.have.property('id');
        expect(OrderQuery.order.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should resolve customer', function (done) {
        OrderQuery.order.resolve(null, { id: createdId })
            .then(response => {
                expect(response).to.have.property('id');
                expect(response._id).to.deep.equals(createdId);
                expect(response).to.be.object();
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have orders query', function () {
        expect(OrderQuery).to.have.property('orders');
        expect(OrderQuery.orders.type).to.deep.equals(new GraphQLList(OrderType));
    });

    it('Should resolve customers', function (done) {
        OrderQuery.orders.resolve()
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