const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
} = graphql;

const ProductInputType = require('../../src/types/product-input');

describe('Product Input Type', function () {
    it('Should have name field of type String', function () {
        expect(ProductInputType.getFields()).to.have.property('name');
        expect(ProductInputType.getFields().name.type).to.deep.equals(GraphQLString);
    });

    it('Should have quantity field of type Int', function () {
        expect(ProductInputType.getFields()).to.have.property('quantity');
        expect(ProductInputType.getFields().quantity.type).to.deep.equals(GraphQLInt);
    });

    it('Should have price field of type Float', function () {
        expect(ProductInputType.getFields()).to.have.property('price');
        expect(ProductInputType.getFields().price.type).to.deep.equals(GraphQLFloat);
    });

    it('Should have description field of type String', function () {
        expect(ProductInputType.getFields()).to.have.property('description');
        expect(ProductInputType.getFields().description.type).to.deep.equals(GraphQLString);
    });
});