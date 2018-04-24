const graphql = require('graphql');
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

describe('Customer Type', () => {
    it('Should have id field of type ID', () => {
        expect(CustomerType.getFields()).to.have.property('id');
        expect(CustomerType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have name field of type String', () => {
        expect(CustomerType.getFields()).to.have.property('name');
        expect(CustomerType.getFields().name.type).to.deep.equals(GraphQLString);
    });

    it('Should have age field of type Int', () => {
        expect(CustomerType.getFields()).to.have.property('age');
        expect(CustomerType.getFields().age.type).to.deep.equals(GraphQLInt);
    });

    it('Should have orders field of type List of OrderType', () => {
        expect(CustomerType.getFields()).to.have.property('orders');
        expect(CustomerType.getFields().orders.type).to.deep.equals(new GraphQLList(OrderType));
    });
});