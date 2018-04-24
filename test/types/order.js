const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const OrderType = require('../../src/types/order');
const OrderDetailType = require('../../src/types/order-detail');
const CustomerType =require('../../src/types/customer');

describe('Order Type', () => {
    it('Should have id field of type ID', () => {
        expect(OrderType.getFields()).to.have.property('id');
        expect(OrderType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have dateOrdered field of type Date', () => {
        expect(OrderType.getFields()).to.have.property('dateOrdered');
        expect(OrderType.getFields().dateOrdered.type).to.deep.equals(GraphQLDate);
    });

    it('Should have customerId field of type ID', () => {
        expect(OrderType.getFields()).to.have.property('customerId');
        expect(OrderType.getFields().customerId.type).to.deep.equals(GraphQLID);
    });

    it('Should have customer field of type Float', () => {
        expect(OrderType.getFields()).to.have.property('customer');
        expect(OrderType.getFields().customer.type).to.deep.equals(CustomerType);
    });

    it('Should have details field of type List of Order Detail', () => {
        expect(OrderType.getFields()).to.have.property('details');
        expect(OrderType.getFields().details.type).to.deep.equals(new GraphQLList(OrderDetailType));
    });
});