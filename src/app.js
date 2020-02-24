import { GraphQLServer } from 'graphql-yoga';
import {config} from 'dotenv';
config();   // Set up environment variables

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation'

import { db } from './db';

const server = new GraphQLServer(
    {
        typeDefs: './src/schema.graphql',
        resolvers: {
            Query,
            Mutation
        }
    }
);

db.connect().then(() => {
    server.start(() => {
        console.log("Server is up");
    })
});
