const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
// const mongoose = require('mongoose')

function generateRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}


const typeDefs = gql`

  

  type File {
    url:[String!]
  }

  type Query {
    files:[String]
  }

  type Mutation {
    UploadFile(file: Upload!): File!
  }
`;

const files = []

const resolvers = {
  Query: {
    files:()=>files
  },
  Mutation: {
    UploadFile: async (parent, {file}) => {
     const { createReadStream, filename, mimetype, encoding } = await file
     const {ext,name} = path.parse(filename)
     const randomName = generateRandomString(12)+ext
        const stream = createReadStream()
        const pathName = path.join(__dirname, `/public/${randomName}`)
        await stream.pipe(fs.createWriteStream(pathName))
        files.push(randomName)
        return {
            url:`http://localhost:4000/${randomName}`
        }
      }
    },
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express()
server.applyMiddleware({app})
app.use(express.static('public'))
app.use(cors())
// mongoose.connect('mongodb://localhost/PodcastBuilderdb').then(
app.listen({ port:4000 },()=>{
    console.log("server on 4000")
})
// )


