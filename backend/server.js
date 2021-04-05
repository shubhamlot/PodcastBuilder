const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')
const graphQLSchema = require('./graphQL/Schema')
const graphQLResolvers = require('./graphQL/Resolvers')
const mongoose = require('mongoose')
const server = express()
const PORT = 8000

server.use(bodyParser.json())
server.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    if(req.method == "OPTIONS"){
      return res.sendStatus(200)
    }
    next()
  })
  

server.use('/graphQl',
    graphqlHTTP({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql:true
    }))

mongoose.connect('mongodb://localhost/PodcastBuilderdb')
.then(
    server.listen(PORT)
)
.catch(err=>{
    console.log(err)
})