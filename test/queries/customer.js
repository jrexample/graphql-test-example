const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const CustomerQuery = require('../../src/queries/customer');
const CustomerType = require('../../src/types/customer');

describe('Customer Query', () => {
    it('Should have customer query', () => {
        expect(CustomerQuery).to.have.property('customer');
        expect(CustomerQuery.customer.type).to.deep.equals(CustomerType);
        expect(CustomerQuery.customer.args).to.have.property('id');
        expect(CustomerQuery.customer.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should have customers query', () => {
        expect(CustomerQuery).to.have.property('customers');
        expect(CustomerQuery.customers.type).to.deep.equals(new GraphQLList(CustomerType));
    });
});