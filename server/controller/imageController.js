import User from '../models/userModel.js'
import FormData from 'form-data'
import axios from 'axios'

export const generateImage=async (req,res)=>{
    try {
        const {userId,prompt} =req.body
        // console.log('Request Body:', req.body);  // Log the entire body
        // console.log('Extracted userId:', userId);  // Log the extracted userId
        const user=await User.findById(userId)
        // console.log(user)
        if(!user||!prompt){
            return res.json({success:false,message:"Missing Details"})
        }
        if(user.creditBalance==0||user.creditBalance<0){
            return res.json({success:false,message:"No credit balance",creditBalance:user.creditBalance})
        }

        const formData=new FormData()
        formData.append('prompt',prompt)

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
            headers:{
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        })
        const base64Image=Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await User.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})


        res.json ({success:true, message:"Image Generated",creditBalance:user.creditBalance-1,resultImage})


    } catch (error) {
        console.error('Error occurred:', error); 
        res.json({success:false, message:"Unable to fetch image"})
    }
}








//The Buffer class in Node.js is like a container that holds raw (binary) data, which computers use to store things like images or files.
//You are putting your raw data into this container(the Buffer).
 //   The 'binary' part just tells Node.js, "Hey, treat this data as raw binary stuff."


// 1=> Buffer.from(data, 'binary'): The Buffer class is used to handle binary data in Node.js.
//                                  Buffer.from(data, 'binary') creates a new buffer from the given data, interpreting it as binary data.The 'binary' encoding specifies how the data should be treated.

// 2=> .toString('base64'):  The.toString('base64') method converts the binary buffer data into a Base64 - encoded string.
//                            Base64 encoding is a way to represent binary data(like images, files, etc.) as a string of ASCII characters.This is useful for transmitting binary data in text - based formats such as JSON or HTML.