
const { argsToArgsConfig } = require('graphql/type/definition')
const User = require('../models/User')

module.exports = {  
    users:()=>{
        return User.find()
        .then(users =>{
          return users.map(user => {
            return {
              ...user._doc,
              _id:user.id,
              
            }
          })
        })
      },
  
      createUser:(arg)=>{
       
         user = new User({
            username : arg.userInput.username
        })
        user.save()
        return user
        
      },
  
}