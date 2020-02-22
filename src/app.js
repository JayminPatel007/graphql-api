import { GraphQLServer } from 'graphql-yoga';
import {config} from 'dotenv';
config();   // Set up environment variables

import { db } from './db';

const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query';
        }
    }
};

const server = new GraphQLServer(
    {
        typeDefs,
        resolvers
    }
);

db.connect().then(() => {
    server.start(() => {
        console.log("Server is up");
    })
});
