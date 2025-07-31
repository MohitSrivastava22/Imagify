import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

function Description() {
  return (
    <motion.div className='flex flex-col items-center justify-center my-12 p-4 sm:p-6 md:px-16'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center'>Create AI Images</h1>
      <p className='text-gray-500 mb-8 text-center'>Turn your imagination into visuals</p>
      <div className='flex flex-col md:flex-row gap-5 md:gap-14 items-center w-full'>
        <img src={assets.sample_img_1} alt="" className='w-full max-w-xs md:max-w-md xl:max-w-lg rounded-lg mb-4 md:mb-0' />
        <div>
          <h2 className='font-medium text-xl sm:text-2xl md:text-3xl max-w-lg mb-2'>Introducing the AI-Powered Text to Image Generator</h2>
          <p className='text-gray-600 mb-4 text-base sm:text-lg'>Easily bring your idea to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.</p>
          <p className='text-gray-600 text-base sm:text-lg'>Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description