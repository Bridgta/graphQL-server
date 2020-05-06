const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

//hardcoded data, will connect db

const customers = [
    { id: "1", name: "Bridget Asser", email: "bridget@yahoo.com", age: 97 },
    { id: "2", name: "Bridgete Doe", email: "doe@yahoo.com", age: 35 },
    { id: "3", name: "Andrew Yang", email: "yang@aol.com", age: 50 },
    { id: "4", name: "Steve Smith", email: "steve@yahoo.com", age: 21 },
    { id: "5", name: "Dave Man", email: "dave@ygmail.com", age: 49 },
];

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                //while hardcoded, will make JSON req
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id == args.id) {
                        return customers[i];
                    }
                }
            },
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
