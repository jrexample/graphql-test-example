const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const ProductMutation = require('../../src/mutations/product');
const ProductType = require('../../src/types/product');
const ProductInputType = require('../../src/types/product-input');

describe('Product Mutation', () => {
    it('Should have create product mutation', () => {
        expect(ProductMutation).to.have.property('createProduct');
        expect(ProductMutation.createProduct.type).to.deep.equals(ProductType);
        expect(ProductMutation.createProduct.args).to.have.property('data');
        expect(ProductMutation.createProduct.args.data.type).to.deep.equals(ProductInputType);
    });

    it('Should have update product mutation', () => {
        expect(ProductMutation).to.have.property('updateProduct');
        expect(ProductMutation.updateProduct.type).to.deep.equals(GraphQLBoolean);
        expect(ProductMutation.updateProduct.args).to.have.property('id');
        expect(ProductMutation.updateProduct.args.id.type).to.deep.equals(GraphQLID);
        expect(ProductMutation.updateProduct.args).to.have.property('data');
        expect(ProductMutation.updateProduct.args.data.type).to.deep.equals(ProductInputType);
    });

    it('Should have delete product mutation', () => {
        expect(ProductMutation).to.have.property('deleteProduct');
        expect(ProductMutation.deleteProduct.type).to.deep.equals(GraphQLBoolean);
        expect(ProductMutation.deleteProduct.args).to.have.property('id');
        expect(ProductMutation.deleteProduct.args.id.type).to.deep.equals(GraphQLID);
    });
});