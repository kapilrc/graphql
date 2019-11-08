const graphql = require("graphql");
const _ = require("lodash");

// define object type in schema
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  { id: 1, name: "first book", genre: "Fantasy" },
  { id: 2, name: "Second book", genre: "Horror" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/ other source
        return _.find(books, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
