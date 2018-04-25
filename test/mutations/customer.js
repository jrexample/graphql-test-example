const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const CustomerMutation = require('../../src/mutations/customer');
const CustomerType = require('../../src/types/customer');
const CustomerInputType = require('../../src/types/customer-input');

describe('Customer Mutation', () => {
    it('Should have create customer mutation', () => {
        expect(CustomerMutation).to.have.property('createCustomer');
        expect(CustomerMutation.createCustomer.type).to.deep.equals(CustomerType);
        expect(CustomerMutation.createCustomer.args).to.have.property('data');
        expect(CustomerMutation.createCustomer.args.data.type).to.deep.equals(CustomerInputType);
    });

    it('Should have update customer mutation', () => {
        expect(CustomerMutation).to.have.property('updateCustomer');
        expect(CustomerMutation.updateCustomer.type).to.deep.equals(GraphQLBoolean);
        expect(CustomerMutation.updateCustomer.args).to.have.property('id');
        expect(CustomerMutation.updateCustomer.args.id.type).to.deep.equals(GraphQLID);
        expect(CustomerMutation.updateCustomer.args).to.have.property('data');
        expect(CustomerMutation.updateCustomer.args.data.type).to.deep.equals(CustomerInputType);
    });

    it('Should have delete customer mutation', () => {
        expect(CustomerMutation).to.have.property('deleteCustomer');
        expect(CustomerMutation.deleteCustomer.type).to.deep.equals(GraphQLBoolean);
        expect(CustomerMutation.deleteCustomer.args).to.have.property('id');
        expect(CustomerMutation.deleteCustomer.args.id.type).to.deep.equals(GraphQLID);
    });
});