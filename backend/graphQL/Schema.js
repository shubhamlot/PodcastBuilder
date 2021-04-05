const { buildSchema } = require("graphql");


module.exports = buildSchema(`

    type User{
    _id:ID!
    username:String!
    email:String!
    password:String!
    isGuest:Boolean!
  }

  input UserInput{
    username:String!
    email:String!
    password:String!
    isGuest:Boolean!
  }

  type Room{
    _id:ID!
    roomname:String!
    creator:String!
    guestList:[String]
  }

  input RoomInput{
    roomname:String!
    creator:String!
    guestList:[String]
  }

  type Audio{
    _id:ID!
    roomid:String!
    speaker:String!
    audioFile:String!
    textData:String
  }

  input AudioInput{
    roomid:String!
    speaker:String!
    audioFile:String!
  }



  type RootQuery{
    users:[User]!
    rooms:[Room]
    audios:[Audio]
  }
  type RootMutation{
    createUser(userInput:UserInput):User
    createRoom(roomInput:RoomInput):Room
    createAudio(audioInput:AudioInput):Audio
  }

  schema{
    query: RootQuery
    mutation: RootMutation
  }



`)