const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const neo4j = require("neo4j-driver").v1;
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const typeDefsGen = require("./make-typeDeft");
const typeDefs = typeDefsGen("./Schema/schema.graphql");

// Initialization of express
const app = express();

// Giving super powers to the schema.
const schema = makeAugmentedSchema({
  typeDefs,
  logger: console.log("Schema Agumentation Done 🤘")
});

// This allows you to use neo4j as a database
const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "letmein")
);

// Now let's add an apollo server instance
const server = new ApolloServer({
  context: { driver },
  schema: schema,
  introspection: true,
  playground: true
});

// Here we place where your server will be.
const port = 4000;
const path = "/graphql";

server.applyMiddleware({ app, path });

app.listen({ port, path }, () => {
  console.log(
    "🚀  You just launched a server congrats 🚀",
    `\n💻  Server ready in ➡ http://localhost:${port}${server.graphqlPath} 💻`
  );
});
