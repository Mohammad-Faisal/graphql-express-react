const express =require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')



app.use(cors())
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);




app.listen( 4000 , () => {
    console.log('app is listening')
    mongoose.connect('mongodb+srv://faisal:faisal@cluster0.lcpbm.mongodb.net/grahql?retryWrites=true&w=majority' ,
        {useNewUrlParser: true, useUnifiedTopology: true},() => {
            console.log('connected to mongoose');

        })
})


