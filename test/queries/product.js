const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const ProductQuery = require('../../src/queries/product');
const ProductType = require('../../src/types/product');

const dataFixture = require('../data-fixtures/product');
let createdId;

describe('Product Query', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response._id;
                    done(err);
                });
        });
    });

    it('Should have product query', function () {
        expect(ProductQuery).to.have.property('product');
        expect(ProductQuery.product.type).to.deep.equals(ProductType);
        expect(ProductQuery.product.args).to.have.property('id');
        expect(ProductQuery.product.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should resolve product', function (done) {
        ProductQuery.product.resolve(null, { id: createdId })
            .then(response => {
                expect(response).to.have.property('id');
                expect(response._id).to.deep.equals(createdId);
                expect(response).to.be.object();
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should have products query', function () {
        expect(ProductQuery).to.have.property('products');
        expect(ProductQuery.products.type).to.deep.equals(new GraphQLList(ProductType));
    });

    it('Should resolve products', function (done) {
        ProductQuery.products.resolve()
            .then(response => {
                expect(response).to.be.array();
                expect(response.length).to.be.above(0);
                done();
            })
            .catch(e => {
                done(e);
            });
    });
});