import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function Login() {

  const [state, setState] = useState('Login')
  const{setShowLogin,backendUrl,setToken,user,setUser}=useContext(AppContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const onSubmitHandler =async (e)=>{
    if(e) e.preventDefault();
    try {
      if(state==='Login'){
        const {data}=await axios.post(backendUrl+'/api/user/login',{email,password})
        console.log("print data",data)
        if(data.success){
          setToken(data.token)
          setUser(data.name)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      }else{
        const { data } = await axios.post(backendUrl + '/api/user/register', { name,email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.name)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
    
  }

  
  const guestUserSetup = () => {
    setEmail('guestUser@gmail.com');
    setPassword('guestUser123');
  };

  const handleCross = () => {
    setShowLogin(false);
    if(!user){
      navigate('/')
    }
  }

  useEffect(() => {
   document.body.style.overflow='hidden';
   return ()=>{
    document.body.style.overflow='unset'
   }
  }, [])
   

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state !== 'Login' && <div className='shadow-lg border px-6 py-2 flex item-center gap-2 rounded-full mt-5'>
          <img src={assets.user_icon} alt="" />
          <input onChange={(e) => setName(e.target.value)} value={name} className='outline-none text-sm' type="text" placeholder='Full Name' required />
        </div>}

        <div className='shadow-lg border px-6 py-2 flex item-center gap-2 rounded-full mt-4'>
          <img src={assets.email_icon} alt="" />
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='outline-none text-sm' type="email" placeholder='Email id' required />
        </div>

        <div className='shadow-lg border px-6 py-2 flex item-center gap-2 rounded-full mt-4'>
          <img src={assets.lock_icon} alt="" />
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='outline-none text-sm' type="password" placeholder='password' required />
        </div>

        {state === 'Login' && <p className='text-sm text-blue-600  my-4 cursor-pointer'>Forget Password</p>}
        <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state=== 'Login'? 'Login':'Create Account'}</button>
        {state === 'Login' && <button className='mt-2 bg-red-400 w-full text-white py-2 rounded-full' onClick={() => guestUserSetup()}>'Guest User'</button>}

        {state==='Login' ?<p className='mt-2 text-center'>Don't have an account?
          <span onClick={()=>setState('Sign Up')} className='mt-2 text-blue-600 cursor-pointer'> Sign up</span>
        </p> :
        <p className='mt-2 text-center'>Already have an account?
          <span onClick={()=>setState('Login')} className='text-blue-600 cursor-pointer'> Login</span>
        </p>}
        <img onClick={()=>handleCross()} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
      </form>
    </div>
  )
}

export default Login
