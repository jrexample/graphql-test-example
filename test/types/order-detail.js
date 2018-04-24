const graphql = require('graphql');
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

describe('Order Detail Type', () => {
    it('Should have id field of type ID', () => {
        expect(OrderDetailType.getFields()).to.have.property('id');
        expect(OrderDetailType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have quantity field of type Int', () => {
        expect(OrderDetailType.getFields()).to.have.property('quantity');
        expect(OrderDetailType.getFields().quantity.type).to.deep.equals(GraphQLInt);
    });

    it('Should have orderId field of type ID', () => {
        expect(OrderDetailType.getFields()).to.have.property('orderId');
        expect(OrderDetailType.getFields().orderId.type).to.deep.equals(GraphQLID);
    });

    it('Should have order field of type Order', () => {
        expect(OrderDetailType.getFields()).to.have.property('order');
        expect(OrderDetailType.getFields().order.type).to.deep.equals(OrderType);
    });

    it('Should have productId field of type ID', () => {
        expect(OrderDetailType.getFields()).to.have.property('productId');
        expect(OrderDetailType.getFields().productId.type).to.deep.equals(GraphQLID);
    });

    it('Should have product field of type Product', () => {
        expect(OrderDetailType.getFields()).to.have.property('product');
        expect(OrderDetailType.getFields().product.type).to.deep.equals(ProductType);
    });
});