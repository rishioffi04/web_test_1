const jwt = require('jsonwebtoken')

const isAuthenticated= async (req,res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
               message:"User not authenticated",
               success:false
            })
        }
        const decode = jwt.verify(token, process.env.TOKEN)
        if(!decode){
            return res.status(401).json({
               message:"token not generated",
               success:false
            })
        }
        req.id= decode.userId
        next()
    }
    catch (err){
        console.log(err)
    }
}

module.exports = isAuthenticated