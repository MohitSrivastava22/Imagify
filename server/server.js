import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import User from './models/userModel.js'

const app=express();

app.use(express.json()) // It is middleware in Express.js that parses incoming JSON payloads from the request body.It automatically converts the raw JSON data sent by the client into a JavaScript object and attaches it to req.body, making it easy to access and work with the data in your application. Without this middleware, the req.body for JSON requests would be undefined.
 // It allows your server to handle requests from other origins (domains, ports, or protocols) that are different from the server's origin.
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true
}));
await connectDB();

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)


app.get('/',(req,res)=>{
    res.send("API is Working")
})

const guestUserSetup =async () => {
    const existUser= await User.findOne({email:'guestUser@gmail.com'})
    if(!existUser){
        const guest=await User.create({
            name: 'Guest User',
            email: 'guestUser@gmail.com',
            password: 'guestUser123',
            creditBalance: 5 // Initial credit balance for the guest user
        })
    }
};  
 const serverSetup=async()=>{
    await guestUserSetup();
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
         console.log('Server is running on Port' + PORT)
    })
 }
serverSetup();



































// Why app.use() Is Better for Routers:

// If you use app.get() or app.post() for every route in a router, you’ll have to define them individually in the main file:

// app.get('/api/user/profile', userProfileHandler);
// app.post('/api/user/login', userLoginHandler);
// app.put('/api/user/update', userUpdateHandler);

// This approach becomes messy when handling many routes.

// Instead, you group all these routes in a Router and use app.use():
// app.use('/api/user', userRouter);