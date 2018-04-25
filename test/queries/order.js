const graphql = require('graphql');
const chai = require('chai');
const expect = chai.expect;

const {
    GraphQLID,
    GraphQLList,
} = graphql;

const OrderQuery = require('../../src/queries/order');
const OrderType = require('../../src/types/order');

describe('Order Query', () => {
    it('Should have order query', () => {
        expect(OrderQuery).to.have.property('order');
        expect(OrderQuery.order.type).to.deep.equals(OrderType);
        expect(OrderQuery.order.args).to.have.property('id');
        expect(OrderQuery.order.args.id.type).to.deep.equals(GraphQLID);
    });

    it('Should have orders query', () => {
        expect(OrderQuery).to.have.property('orders');
        expect(OrderQuery.orders.type).to.deep.equals(new GraphQLList(OrderType));
    });
});