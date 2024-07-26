
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const AuthMiddleware = async(req,res,next) =>{
  
  try {
    const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, process.env.KEY, async(err, decoded)=> {
            if(err) {
              console.log(err);
              return res.json({msg:"You are not logged in"})
            }
            else if(decoded){
              console.log('decode', decoded)
              req.body.userId = decoded.userId;
              next()
            } 
      });
  } catch (error) {
    res.json({error})
  }
}

