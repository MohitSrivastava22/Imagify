import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

// const userAuth = async (req, res, next) => {
//     //req.header in Express.js refers to a method used to access the headers of an incoming HTTP request. HTTP headers are part of the request that provide additional information about the request, such as metadata (like content type, user agent, authorization tokens, etc.).

//     const authHeader = req.headers.authorization;
//     // console.log('Authorization Header:', req.headers.authorization);
//     // console.log('authHeader', authHeader);
    


//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.json({ success: false, message: 'Not Authorized. Login Again' });
//     }

//     const token = authHeader.split(' ')[1];
//     // console.log('token',token);
    
//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
//         if (tokenDecode.id) {
//             req.body.userId = tokenDecode.id
//             next();
//         } else {
//             return res.json({ success: false, message: 'Not Authorized. Login Again' })
//         }
//     } catch (error) {
//         return res.json({ success: false, message: error.message })

//     }
// }
const userAuth = expressAsyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

export default userAuth
//A bearer token is a type of access token used to authenticate and authorize access to a resource or service. The term "bearer" signifies that possession of the token is sufficient to gain access to the associated resources—it acts as proof of identity and permissions.