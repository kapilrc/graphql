const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// helps our express app interact and understand graphql bcoz out of the box express doesn't understand graphql
const graphqlHTTP = require("express-graphql");

const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// connect to mLab db
mongoose.connect(process.env.CONNECTIONSTRING);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// create endpoint - middleware on a single route to interact with graphql data (one supercharged endpoint to rule them all)
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listerning to request on ${PORT}`);
});
