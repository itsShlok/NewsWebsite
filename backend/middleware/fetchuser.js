const  jwt = require('jsonwebtoken');
const JWT_SECRET="Abcd"


const fetchuser=(req,res,next)=>{
    // get the user from the jwt token and add id to request obj
    const token=req.header('auth-token');
    // console.log(token)
    if(!token){
        res.status(401).send({error:"please authenticate using valid token1"})
    }
    try{
        // console.log("Decoded token payload:", jwt.decode(token));
        const data = jwt.verify(token, JWT_SECRET);

        // console.log(data)
        req.user=data.user;
        next();
    }catch(error){
        console.error("Token verification error:", error.message);
        res.status(401).send({error:"please authenticate using valid token"})
    }

}

module.exports=fetchuser;