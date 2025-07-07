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
    <div>
     <Header/>
      <div ref={interactiveRef}><Steps /></div>
      <div ref={descriptionRef}><Description /></div>
      <div ref={testimonialsRef}><Testimonials /></div>
     <GenerateBtn/>
    </div>
  )
}

export default Home
