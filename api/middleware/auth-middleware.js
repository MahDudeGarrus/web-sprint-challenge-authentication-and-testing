const Users = require('../users/users-model.js')

const usernamePasswordInputValid = (req, res, next) => {
    const { username, password } = req.body
    if(!username || !password) {
        res.status(401).json({
            message: "username and password required"
        })
    } else {
        next()
    }
}

const checkUsernameFree = async (req, res, next) => {
    try {
        const users = await Users.findBy({ username: req.body.username })
        if(!users.length){
            next()
        } else {
            next({
                status: 422,
                message: "username taken"
            })
        }
    } catch (error) {
        next(error)
    }
}

const checkUsernameExists = async (req, res, next) => {
   try{
     const [user] = await Users.findBy({ username: req.body.username })
     if (!user){
      next({
        status: 401,
        message: "invalid credentials"
      })
     } else {
       req.user = user
       next()
     }
   } catch(error) {
     next(error)
   }
   
  }

module.exports = {
    usernamePasswordInputValid,
    checkUsernameFree,
    checkUsernameExists
}