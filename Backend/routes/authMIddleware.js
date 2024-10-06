const jwt = require("jsonwebtoken");
const { SECRETE_KEY } = require("./config");

const authMiddleware = (req,res,next)=>{
    const authorisation = req.headers.authorization;
    if(!authorisation){
        return res.status(500).send({
            message:"session out",
            success:false
        })
    };
    try{
        const verifiedToken = jwt.verify(authorisation,SECRETE_KEY);
        req.userid = verifiedToken.userid
        next()
    }catch(e){
        return res.status(500).send({
            message:"session out",
            success:false
        })
}
}

module.exports = authMiddleware