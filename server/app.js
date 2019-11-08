const express = require('express');
const schema = require('./schema/schema')

// helps our express app interact and understand graphql bcoz out of the box express doesn't understand graphql
const graphqlHTTP = require('express-graphql')

const app = express();

// create endpoint - middleware on a single route to interact with graphql data (one supercharged endpoint to rule them all)
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`listerning to request on ${PORT}`)
})

