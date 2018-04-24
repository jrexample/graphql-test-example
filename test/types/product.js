const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
} = graphql;

const ProductType = require('../../src/types/product');

describe('Product Type', () => {
    it('Should have id field of type ID', () => {
        expect(ProductType.getFields()).to.have.property('id');
        expect(ProductType.getFields().id.type).to.deep.equals(GraphQLID);
    });

    it('Should have name field of type String', () => {
        expect(ProductType.getFields()).to.have.property('name');
        expect(ProductType.getFields().name.type).to.deep.equals(GraphQLString);
    });

    it('Should have quantity field of type Int', () => {
        expect(ProductType.getFields()).to.have.property('quantity');
        expect(ProductType.getFields().quantity.type).to.deep.equals(GraphQLInt);
    });

    it('Should have price field of type Float', () => {
        expect(ProductType.getFields()).to.have.property('price');
        expect(ProductType.getFields().price.type).to.deep.equals(GraphQLFloat);
    });

    it('Should have description field of type String', () => {
        expect(ProductType.getFields()).to.have.property('description');
        expect(ProductType.getFields().description.type).to.deep.equals(GraphQLString);
    });
});