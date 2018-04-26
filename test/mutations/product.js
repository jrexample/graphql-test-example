const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);

const expect = chai.expect;

const {
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const ProductMutation = require('../../src/mutations/product');
const ProductType = require('../../src/types/product');
const ProductInputType = require('../../src/types/product-input');

const dataFixture = require('../data-fixtures/customer');
const data = dataFixture.getNewData();
let createdId;

describe('Product Mutation', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            done(err);
        });
    });

    it('Should have create product mutation', function () {
        expect(ProductMutation).to.have.property('createProduct');
        expect(ProductMutation.createProduct.type).to.deep.equals(ProductType);
        expect(ProductMutation.createProduct.args).to.have.property('data');
        expect(ProductMutation.createProduct.args.data.type).to.deep.equals(ProductInputType);
    });

    it('Should success create product', function (done) {
        ProductMutation.createProduct.resolve(null, { data })
            .then(response => {
                expect(response).to.have.property('_id');
                expect(response._id).to.be.an('object');

                createdId = response._id;
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have update product mutation', function () {
        expect(ProductMutation).to.have.property('updateProduct');
        expect(ProductMutation.updateProduct.type).to.deep.equals(GraphQLBoolean);
        expect(ProductMutation.updateProduct.args).to.have.property('id');
        expect(ProductMutation.updateProduct.args.id.type).to.deep.equals(GraphQLID);
        expect(ProductMutation.updateProduct.args).to.have.property('data');
        expect(ProductMutation.updateProduct.args.data.type).to.deep.equals(ProductInputType);
    });

    it('Should success update product', function (done) {
        ProductMutation.updateProduct.resolve(null, { id: createdId, data })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(true);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should error update product with empty data', function (done) {
        ProductMutation.updateProduct.resolve(null, { id: {}, data: {} })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(false);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have delete product mutation', function () {
        expect(ProductMutation).to.have.property('deleteProduct');
        expect(ProductMutation.deleteProduct.type).to.deep.equals(GraphQLBoolean);
        expect(ProductMutation.deleteProduct.args).to.have.property('id');
        expect(ProductMutation.deleteProduct.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should success delete product', function (done) {
        ProductMutation.deleteProduct.resolve(null, { id: createdId })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(true);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should error delete product with empty id', function (done) {
        ProductMutation.deleteProduct.resolve(null, { id: {} })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(false);
                done();
            })
            .catch(e => {
                done(e);
            });
    });
});