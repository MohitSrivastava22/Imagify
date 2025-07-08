import React, { useContext, useRef } from 'react'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import './index.css'
import ProtectedRoute from './middleware/ProtectedRoute';

const App = () => {
  const {showLogin}=useContext(AppContext)
  const interactiveRef = useRef(null)
  const descriptionRef = useRef(null)
  const testimonialsRef = useRef(null)
  const location = useLocation();//to get location
  return (
    <>
      {/* <div className='px-4 sm:px-10 lg:px-28 md:px-14 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'> */}
      <div className='abc px-2 sm:px-10 lg:px-16 md:px-14 min-h-screen '>

      <ToastContainer position='bottom-right'/>
      <Navbar interactiveRef={interactiveRef} descriptionRef={descriptionRef} testimonialsRef={testimonialsRef}/>
        {showLogin && location.pathname !== '/' && <Login />}
        {showLogin && <Login />}
      <Routes>
        <Route path='/' element={
            <Home interactiveRef={interactiveRef} descriptionRef={descriptionRef} testimonialsRef={testimonialsRef} />
        } />
        <Route path='/result' element={
            <ProtectedRoute><Result /></ProtectedRoute>
        } />
        <Route path='/buy' element={
            <ProtectedRoute><BuyCredit /></ProtectedRoute>
        } />
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App

