const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const connectionString = 'mongodb://localhost:27017/test';

mongoose.connect(connectionString);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`App now listening on port ${port}`);
});
