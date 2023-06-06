const jwt = require("jsonwebtoken");

const authentication = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        res.status(401).json({msg:"you are not authorized"});
    }
    try {
        jwt.verify(token,"rajSecretApp",(err,decoded)=>{
            if(err){
                res.status(400).json({msg:"Something went wrong while authentication ",err});
            }
            else if(decoded){
                const userID = decoded.userID;
                req.body.user = userID;
                next();
            }
        })
    } catch (error) {
        
    }
}

module.exports = authentication;