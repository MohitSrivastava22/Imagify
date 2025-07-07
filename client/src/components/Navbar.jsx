import React, { useContext, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Description from './Description'
import Steps from './Steps'
import Testimonials from './Testimonials'
const Navbar = ({ interactiveRef, descriptionRef, testimonialsRef }) => {
    const { user, setShowLogin, logoutFunction ,credit} = useContext(AppContext)
    const navigate = useNavigate();
    const location = useLocation();
    
    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const showSectionButtons = location.pathname === '/';

    return (
        <div className='flex items-center justify-between py-4'>
                <Link to='/'>
                    <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
                </Link>


                {showSectionButtons && (
                    <div className='flex ml-24 items-center gap-4 sm:gap-6'>
                        <button onClick={() => scrollToSection(descriptionRef)} className='text-2xl sm:text-1xl font-medium hover:scale-105 transition-all duration-700'>Description</button>
                        <button onClick={() => scrollToSection(testimonialsRef)} className='text-2xl sm:text-1xl font-medium hover:scale-105 transition-all duration-700'>Testimonials</button>
                        <button onClick={() => scrollToSection(interactiveRef)} className='text-2xl sm:text-1xl font-medium hover:scale-105 transition-all duration-700'>Interactive</button>
                    </div>
                )}
                <div>
                    {user ? <div className='flex items-center gap-2 sm:gap-3'>
                        <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-200 px-2 sm:px-2 py-1 sm:py-1 rounded-full hover:scale-105 transition-all duration-700'>
                            <img className=' w-5' src={assets.credit_star} alt="" />
                            <p className='text-2xl sm:text-1xl'>Credits left: {credit}</p>
                        </button>
                        <p className='text-2xl max-sm:hidden pl-4'>{user}</p>
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-10 drop-shadow' alt='' />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                {/* list-none: This utility class removes any default list styling, such as bullets or numbers, from a list element */}
                                <ul className='list-none m-0 p-2 bg-blue-200 rounded-md border text-sm'>
                                    <li onClick={logoutFunction} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        : <div className='flex items-center gap-2 sm:gap-5'>
                        <p onClick={() => { navigate('/buy') }} className='text-2xl sm:text-1xl font-medium hover:scale-105 transition-all duration-700 cursor-pointer'>Pricing</p>
                        <button onClick={() => setShowLogin(true)} className='bg-zinc-800 text-white px-3 sm:px-3 py-2 sm:py-2 rounded-full text-2xl sm:text-1xl font-medium hover:scale-105 transition-all duration-700'>Login</button>
                        </div>
                    }
                </div>
           </div>
    )
}

export default Navbar
