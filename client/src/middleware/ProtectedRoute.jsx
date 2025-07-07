import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const ProtectedRoute = ({ children }) => {
    const { token, setShowLogin } = useContext(AppContext)

    useEffect(() => {
        if (!token) {
            setShowLogin(true);         // ✅ Show login popup
        }
    }, [token, setShowLogin]);
    if (!token) return null
    return children
}

export default ProtectedRoute