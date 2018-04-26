const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLInt,
} = graphql;

const OrderDetailInputType = require('../../src/types/order-detail-input');

describe('Order Detail Input Type', function () {
    it('Should have id field of type ID', function () {
        expect(OrderDetailInputType.getFields()).to.have.property('id');
        expect(OrderDetailInputType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have quantity field of type Int', function () {
        expect(OrderDetailInputType.getFields()).to.have.property('quantity');
        expect(OrderDetailInputType.getFields().quantity.type).to.deep.equals(GraphQLInt);
    });

    it('Should have orderId field of type ID', function () {
        expect(OrderDetailInputType.getFields()).to.have.property('orderId');
        expect(OrderDetailInputType.getFields().orderId.type).to.deep.equals(GraphQLID);
    });

    it('Should have productId field of type ID', function () {
        expect(OrderDetailInputType.getFields()).to.have.property('productId');
        expect(OrderDetailInputType.getFields().productId.type).to.deep.equals(GraphQLID);
    });
});