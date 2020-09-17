const jwt =  require('jsonwebtoken')
const config = require('config')
module.exports = (req,res,next) =>{
    const token = req.header("x-auth-token");
    if(!token){
        res.status(401).json({error:'access denied'});
        return
    }
    try{
        const verified = jwt.verify(token,config.get("jwtSecret"));
        if(!verified){
            res.status(400).json({error:'invalid token'})
            return;
        }
        req.user = verified;
    } catch(err){
        res.status(500).json({error:'server error'})
    }
    next();
}