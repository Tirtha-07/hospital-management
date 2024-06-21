const jwt = require("jsonwebtoken");
// const SECRET_KEY="NODE_API"
const secretKey= "secret_key"




exports. auth=(req,res,next)=>{
   
 
    
    try{

    let token = req.headers["authorization"]
    console.log("token===>",token);
    if(token){
        token = token.split(" ")[1];
        console.log("token===>",token);
        let user=jwt.verify(token,secretKey)
  
        // req.userID = user.id
    
     
    }else{
        res.status(401).send({message:"Unauthorized Users"})
    }



    }catch(error){
        res.status(401).send({message:"Unauthorized Userssss"})

    }
  
    next();
}