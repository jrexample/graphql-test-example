const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLBoolean,
} = graphql;

const OrderMutation = require('../../src/mutations/order');
const OrderType = require('../../src/types/order');
const OrderInputType = require('../../src/types/order-input');

describe('Order Mutation', () => {
    it('Should have create order mutation', () => {
        expect(OrderMutation).to.have.property('createOrder');
        expect(OrderMutation.createOrder.type).to.deep.equals(OrderType);
        expect(OrderMutation.createOrder.args).to.have.property('data');
        expect(OrderMutation.createOrder.args.data.type).to.deep.equals(OrderInputType);
    });

    it('Should have update order mutation', () => {
        expect(OrderMutation).to.have.property('updateOrder');
        expect(OrderMutation.updateOrder.type).to.deep.equals(GraphQLBoolean);
        expect(OrderMutation.updateOrder.args).to.have.property('id');
        expect(OrderMutation.updateOrder.args.id.type).to.deep.equals(GraphQLID);
        expect(OrderMutation.updateOrder.args).to.have.property('data');
        expect(OrderMutation.updateOrder.args.data.type).to.deep.equals(OrderInputType);
    });

    it('Should have delete order mutation', () => {
        expect(OrderMutation).to.have.property('deleteOrder');
        expect(OrderMutation.deleteOrder.type).to.deep.equals(GraphQLBoolean);
        expect(OrderMutation.deleteOrder.args).to.have.property('id');
        expect(OrderMutation.deleteOrder.args.id.type).to.deep.equals(GraphQLID);
    });
});