const { buildSchema } = require("graphql");


module.exports = buildSchema(`

    type User{
    _id:ID!
    username:String!
  }

  input UserInput{
    username:String!
  }

  type RootQuery{
    
    users:[User]!
   
  }
  type RootMutation{
    createUser(userInput:UserInput):User
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }



`)