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

const CustomerMutation = require('../../src/mutations/customer');
const CustomerType = require('../../src/types/customer');
const CustomerInputType = require('../../src/types/customer-input');

const dataFixture = require('../data-fixtures/customer');
const data = dataFixture.getNewData();
let createdId;

describe('Customer Mutation', function () {
    before(function (done) {
        mongoose.connection.db.dropDatabase(function (err) {
            done(err);
        });
    });

    it('Should have create customer mutation', function () {
        expect(CustomerMutation).to.have.property('createCustomer');
        expect(CustomerMutation.createCustomer.type).to.deep.equals(CustomerType);
        expect(CustomerMutation.createCustomer.args).to.have.property('data');
        expect(CustomerMutation.createCustomer.args.data.type).to.deep.equals(CustomerInputType);
    });

    it('Should success create customer', function (done) {
        CustomerMutation.createCustomer.resolve(null, { data })
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

    it('Should have update customer mutation', function () {
        expect(CustomerMutation).to.have.property('updateCustomer');
        expect(CustomerMutation.updateCustomer.type).to.deep.equals(GraphQLBoolean);
        expect(CustomerMutation.updateCustomer.args).to.have.property('id');
        expect(CustomerMutation.updateCustomer.args.id.type).to.deep.equals(GraphQLID);
        expect(CustomerMutation.updateCustomer.args).to.have.property('data');
        expect(CustomerMutation.updateCustomer.args.data.type).to.deep.equals(CustomerInputType);
    });

    it('Should success update customer', function (done) {
        CustomerMutation.updateCustomer.resolve(null, { id: createdId, data })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(true);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should error update customer with empty data', function (done) {
        CustomerMutation.updateCustomer.resolve(null, { id: {}, data: {} })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(false);
                done();
            })
            .catch(e => {
                done(e);
            });
    });


    it('Should have delete customer mutation', function () {
        expect(CustomerMutation).to.have.property('deleteCustomer');
        expect(CustomerMutation.deleteCustomer.type).to.deep.equals(GraphQLBoolean);
        expect(CustomerMutation.deleteCustomer.args).to.have.property('id');
        expect(CustomerMutation.deleteCustomer.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should success delete customer', function (done) {
        CustomerMutation.deleteCustomer.resolve(null, { id: createdId })
            .then(response => {
                expect(response).to.be.boolean();
                expect(response).to.equal(true);
                done();
            })
            .catch(e => {
                done(e);
            });
    });

    it('Should error delete customer with empty id', function (done) {
        CustomerMutation.deleteCustomer.resolve(null, { id: {} })
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