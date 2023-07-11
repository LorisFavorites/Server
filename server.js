const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const path = require('path');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Import scheduled jobs for the server
const scheduledFunctions = require('./utils/scheduledFuncs');
// Import data loader
// const fetchData = require('./utils/propogateCards');
const axios = require('axios');

// For Apollo version 4 from apollo-server-express
const http = require('http');
const cors = require('cors');
const { json } = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the function schedule after middleware
scheduledFunctions.initScheduledJobs();

const myPlugin = {
    serverWillStart() {
      console.log('Server starting up!');
    },
};

// Create a new instance of Apollo Server
const startApolloServer = async () => {
    await server.start();
    // await fetchData();

    // Add Apollo Server onto Express 4
    app.use(
        '/graphql',
        cors(),
        json(),
        expressMiddleware(server, {
            context: authMiddleware
        }),
    );
    
    // Open database connection
    db.once('open', () => {
        new Promise((resolve) => httpServer.listen(PORT, resolve ));
        console.log(`API Server running on port ${PORT}`);
        console.log(`GraphQL accessable at http://localhost:${PORT}/graphql`);
        // begin scheduled tasks
        // scheduledFunctions.initScheduledJobs();
        // Works inside and outside of startApolloServer   
    });

};

startApolloServer();