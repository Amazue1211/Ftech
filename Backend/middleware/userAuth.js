
// import { json } from "express";
import jwt from "jsonwebtoken";

const userAuth=  async (req, res, next)=>{
    const{token} = req.cookies;

    if(!token){
        return res.json({success: false , messsage: 'not authorized login'})
    }

    try{
        const tokenDecode =  jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
             req.body.userId = tokenDecode.id
        }else{
            return res.json({success: false , messsage: 'not authorized login'})
        }next()
    }catch(error){
        return res.json({success: false , messsage: 'not authorized login'})
    }
}
export default userAuth;

// import jwt from "jsonwebtoken";

// const userAuth = (req, res, next) => {
//   try {
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.json({ success: false, message: "No token pkrovided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.id;
// console.log("Authorization header:", req.headers.authorization);
//     next();
//   } catch (error) {
//     return res.json({ success: false, message: "Invalid token" });
//   }
// };

// export default userAuth;

// import jwt from "jsonwebtoken";

// const userAuth = (req, res, next) => {
//   try {
//     // get token from header
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.json({
//         success: false,
//         message: "No token provided"
//       });
//     }

//     // verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // attach user id
//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// export default userAuth;