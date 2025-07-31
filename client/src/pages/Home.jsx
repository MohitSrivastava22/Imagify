import React, { useContext, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'
import { AppContext } from '../context/AppContext'

const Home = ({interactiveRef ,descriptionRef,testimonialsRef}) => {

  const { setShowLogin } = useContext(AppContext);
  return (
    <div className="w-full px-2 sm:px-6 md:px-12 lg:px-24">
     <Header/>
      <div ref={interactiveRef} className="my-6"><Steps /></div>
      <div ref={descriptionRef} className="my-6"><Description /></div>
      <div ref={testimonialsRef} className="my-6"><Testimonials /></div>
     <GenerateBtn/>
    </div>
  )
}

export default Home
