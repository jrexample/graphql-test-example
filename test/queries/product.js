const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const ProductQuery = require('../../src/queries/product');
const ProductType = require('../../src/types/product');

describe('Product Query', () => {
    it('Should have product query', () => {
        expect(ProductQuery).to.have.property('product');
        expect(ProductQuery.product.type).to.deep.equals(ProductType);
        expect(ProductQuery.product.args).to.have.property('id');
        expect(ProductQuery.product.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should have products query', () => {
        expect(ProductQuery).to.have.property('products');
        expect(ProductQuery.products.type).to.deep.equals(new GraphQLList(ProductType));
    });
});