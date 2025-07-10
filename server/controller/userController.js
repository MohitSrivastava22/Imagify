import generateToken from '../config/generateToken.js'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import razorpay from 'razorpay'
import Transaction from '../models/transactionModel.js'


const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body
    if(!name||!email||!password){
        return res.status(400).json({sucess:false,message:'Missing Details'})
    }
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User Already Exist")
    }
    const user=await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            success:true,
            name:user.name,
            email:user.email,
            creditBalance: user.creditBalance,
            token: generateToken(user._id)
        })
    }else{
        res.json({ success: false, message: "User not found" })
    }
})


const loginUser =asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.status(400).json({ success: false, message: "Enter all the details" })
    
    }
    const user=await User.findOne({email})
    if(!user){
        return res.status(400).json({ success: false, message: "User not found" })
    }
    if (await user.matchedPassword(password)){
        res.json({
            success:true,
            name: user.name,
            email: user.email,
            creditBalance: user.creditBalance,
            token:generateToken(user._id)
        })
    }else{
        res.json({ success: false, message: "Invalid Email or Password" })
    }
})



const userCredit= asyncHandler(async (req,res)=>{
    const  userId  = req.user._id;
    // console.log("UserID",userId);
    
    const user=await User.findById(userId)
    if(user){
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name }})
    }
})


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);


const paymentRazorpay=async (req,res)=>{
    try {
        // const {userId,planId}=req.body
        const userId= req.user._id
        // console.log("User ID from token:", userId);
        
        const { planId } = req.body
        if (!userId || !planId) {
            return res.json({ success: false, message: "Enterrr all the details" });
        }
        const userData=await User.findById(userId)  
        // console.log("User Data:", userData);
        
        if(!userId){
            return res.json({ success: false, message: "User not found" })
        }
        let credits,plan,amount,date
        switch(planId){
            case 'Basic':
                plan='Basic';
                credits=100;
                amount=10;
                break;

            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000;
                amount = 250;
                break;

                default:
                    return res.json({success:false,message:'plan not found'})
        }
        date=Date.now();
        const transactionData= {
            userId , plan,amount ,credits,date
        }

        const newTransaction = await Transaction.create(transactionData)
        const options ={
            amount :amount*100,
            currency:process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
        }

        // await razorpayInstance.orders.create(options,(error,order)=>{
        //         if(error) {
        //             console.log(error)
        //             res.json({ success: false, message: "error" })
        //         }
        //         res.json({success:true, order})
        // })
        try {
            const order = await razorpayInstance.orders.create(options);
            res.json({ success: true, order });
        } catch (error) {
            console.error("Razorpay order creation error:", error); // full error
            if (error?.error) {
                console.error("Razorpay API error details:", error.error);
            }
            res.json({ success: false, message: "Razorpay order creation failed", error });
        }


        
    } catch (error) {
            res.json({success:false})
    }
}

const verifyRazorpay = async (req,res)=>{
    try {
        const {razorpay_order_id}=req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status==='paid'){
            const transactionData = await Transaction.findById(orderInfo.receipt)
            if (transactionData.payment){
                return res.json({success:false,message:'Payment Failed'})
            }
            const userData = await User.findById(transactionData.userId)
            const creditBalance =userData.creditBalance + transactionData.credits
            await User.findByIdAndUpdate(userData._id,{creditBalance})
            await Transaction.findByIdAndUpdate(transactionData._id, { payment:true })
            res.json({success:true,message:"Credit Added"})
            
        }else{
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export { registerUser, loginUser, userCredit, paymentRazorpay, verifyRazorpay }