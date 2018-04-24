const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLString,
    GraphQLInt,
} = graphql;

const CustomerInputType = require('../../types/customer-input');

describe('Customer Input Type', () => {
    it('Should have name field of type String', () => {
        expect(CustomerInputType.getFields()).to.have.property('name');
        expect(CustomerInputType.getFields().name.type).to.deep.equals(GraphQLString);
    });

    it('Should have age field of type Int', () => {
        expect(CustomerInputType.getFields()).to.have.property('age');
        expect(CustomerInputType.getFields().age.type).to.deep.equals(GraphQLInt);
    });
});