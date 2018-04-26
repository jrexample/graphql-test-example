const graphql = require('graphql');
const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const CustomerQuery = require('../../src/queries/customer');
const CustomerType = require('../../src/types/customer');

const dataFixture = require('../data-fixtures/customer');
let createdId;

describe('Customer Query', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            dataFixture.getTestData()
                .then(response => {
                    createdId = response._id;
                    done(err);
                });
        });
    });

    it('Should have customer query', function () {
        expect(CustomerQuery).to.have.property('customer');
        expect(CustomerQuery.customer.type).to.deep.equals(CustomerType);
        expect(CustomerQuery.customer.args).to.have.property('id');
        expect(CustomerQuery.customer.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should resolve customer', function (done) {
        CustomerQuery.customer.resolve(null, { id: createdId })
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

    it('Should have customers query', function () {
        expect(CustomerQuery).to.have.property('customers');
        expect(CustomerQuery.customers.type).to.deep.equals(new GraphQLList(CustomerType));
    });

    it('Should resolve customers', function (done) {
        CustomerQuery.customers.resolve()
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