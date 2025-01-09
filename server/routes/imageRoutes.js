import express from 'express'
import userAuth from '../middleware/auth.js'
import { generateImage } from '../controller/imageController.js'


const imageRouter=express.Router()
//In generateImage function we need userId from token therefore we use userAuth middleware
imageRouter.post('/generate-image' , userAuth, generateImage)

export default imageRouter