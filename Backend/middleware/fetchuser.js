const jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    //Get USer from the jwt token and id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate usig a valid token"})
    }
try {
    const data=jwt.verify(token,"chinmay")
    req.user=data.user;
    next()
} catch (error) {
    res.status(401).send({error:"Please authenticate usig a valid token"})

}
}
module.exports=fetchuser;
