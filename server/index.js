const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

const app = express();
const schema = require('./schema/schema');

//connect to database
connectDB();

app.get('/', (req, res) => {
    res.status(200).send(`Server is running on port ${port}`);
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));


app.listen(port, console.log(`Server running on port ${port}`))

