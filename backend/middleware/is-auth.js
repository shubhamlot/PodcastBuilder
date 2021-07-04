const jwt = require("jsonwebtoken")

module.exports = (req, res , next) =>{
    const authHeader = req.get('Authorization')
    // console.log(authHeader)
    if(!authHeader){
        req.isAuth = false
        return next()
    }
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    console.log(token)

    if(!token || token === ' '){
        req.isAuth = false
        return next()
    }

    let decodedtoken
    try{
        decodedtoken = jwt.verify(token, 'somesupersecretkey')
        
    }
    catch(err){
        req.isAuth = false
        return next()
    }
    if(!decodedtoken){
        req.isAuth = false
        return next
    }

    req.isAuth = true
    req.userId = decodedtoken.userId
    next()
}