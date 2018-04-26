const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const { GraphQLDate } = require('graphql-iso-date');

const OrderInputType = require('../../src/types/order-input');
const OrderDetailInputType = require('../../src/types/order-detail-input');

describe('Order Input Type', function () {
    it('Should have customerId field of type ID', function () {
        expect(OrderInputType.getFields()).to.have.property('customerId');
        expect(OrderInputType.getFields().customerId.type).to.deep.equals(GraphQLID);
    });

    it('Should have dateOrdered field of type Date', function () {
        expect(OrderInputType.getFields()).to.have.property('dateOrdered');
        expect(OrderInputType.getFields().dateOrdered.type).to.deep.equals(GraphQLDate);
    });

    it('Should have details field of type List of Order Detail Input', function () {
        expect(OrderInputType.getFields()).to.have.property('details');
        expect(OrderInputType.getFields().details.type).to.deep.equals(new GraphQLList(OrderDetailInputType));
    });
});