const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);

const expect = chai.expect;

const {
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const OrderMutation = require('../../src/mutations/order');
const OrderType = require('../../src/types/order');
const OrderInputType = require('../../src/types/order-input');

const dataFixture = require('../data-fixtures/order');
let data, updateData;
let createdId;

describe('Order Mutation', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture
                .getNewData()
                .then(response => {
                    data = response;

                    done(err);
                });
        });
    });

    it('Should have create order mutation', function () {
        expect(OrderMutation).to.have.property('createOrder');
        expect(OrderMutation.createOrder.type).to.deep.equals(OrderType);
        expect(OrderMutation.createOrder.args).to.have.property('data');
        expect(OrderMutation.createOrder.args.data.type).to.deep.equals(OrderInputType);
    });

    it('Should success create order', function (done) {
        OrderMutation.createOrder.resolve(null, { data })
            .then(response => {
                expect(response).to.have.property('_id');
                expect(response._id).to.be.an('object');

                createdId = response._id;
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have update order mutation', function () {
        expect(OrderMutation).to.have.property('updateOrder');
        expect(OrderMutation.updateOrder.type).to.deep.equals(GraphQLBoolean);
        expect(OrderMutation.updateOrder.args).to.have.property('id');
        expect(OrderMutation.updateOrder.args.id.type).to.deep.equals(GraphQLID);
        expect(OrderMutation.updateOrder.args).to.have.property('data');
        expect(OrderMutation.updateOrder.args.data.type).to.deep.equals(OrderInputType);
    });

    it('Should success update order', function (done) {
        dataFixture.getDetailsByOrderId(createdId)
            .then(responseDetails => {
                responseDetails.pop();

                let newData = {
                    productId: responseDetails[0].productId,
                    quantity: 10,
                };
                
                updateData = {
                    ...data,
                    details: [...responseDetails, newData]
                };

                OrderMutation.updateOrder.resolve(null, { id: createdId, data: updateData })
                    .then(response => {
                        expect(response).to.be.boolean();
                        expect(response).to.equal(true);
                        done();
                    })
                    .catch(e => {
                        done(e);
                    });
            });
    });

    it('Should error update order with empty data', function (done) {
        OrderMutation.updateOrder.resolve(null, { id: {}, data: {} })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(false);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have delete order mutation', function () {
        expect(OrderMutation).to.have.property('deleteOrder');
        expect(OrderMutation.deleteOrder.type).to.deep.equals(GraphQLBoolean);
        expect(OrderMutation.deleteOrder.args).to.have.property('id');
        expect(OrderMutation.deleteOrder.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should success delete order', function (done) {
        OrderMutation.deleteOrder.resolve(null, { id: createdId })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(true);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should error delete order with empty id', function (done) {
        OrderMutation.deleteOrder.resolve(null, { id: {} })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(false);
                done();
            })
            .catch(e => {
                done(e);
            });
    });
});