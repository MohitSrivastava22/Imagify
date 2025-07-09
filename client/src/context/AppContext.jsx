import {createContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const AppContext =createContext()

const AppContextProvider=(props)=>{
    const [user,setUser]= useState(null);
    const [showLogin, setShowLogin] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState()

    const navigate=useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const loadCreditData= async ()=>{
        // console.log("Token", token);
        
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/credits`, { headers: { Authorization: `Bearer ${token}` }})
            console.log(data)
            if(data.success){
                setCredit(data.credits)                
                setUser(data.user.name)
            }
        } catch (error) {
            console.log("Error loading credit data:", error);
            
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(token){
            loadCreditData();
        }
    }, [token])



    const logoutFunction=async ()=>{
        localStorage.removeItem('token');
        setUser(null)
        setToken(null)
        setCredit(null)
    }
    



    const generateImage =async (prompt)=>{
       try {
           const { data } = await axios.post(`${backendUrl}/api/image/generate-image`, { prompt }, { headers: { Authorization: `Bearer ${token}` } })
           console.log(data)
           if (data.success) {
               loadCreditData()
               return data.resultImage
           }else{
            toast.error(data.message)
               if (data.creditBalance==0){
                navigate('/buy')
               }
           }
       } catch (error) {
        
       }
    }



    const value = { user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditData, logoutFunction, generateImage }
     
    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}

export default AppContextProvider