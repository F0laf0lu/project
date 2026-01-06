import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { isTokenExpired } from '../utils/utils';
import AuthService from "../services/authService";


const AuthContext = createContext()


const AuthProvider = ({children})=>{

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const handleLogin = (user)=>{
        setAuthUser(user)
    }

    useEffect(()=>{
        const currentUser = localStorage.getItem('currentUser')
        const token = localStorage.getItem('token')
        if (token && currentUser && !isTokenExpired(token)) {
            setAuthUser(JSON.parse(currentUser));
            setToken(token)
            setIsAuthenticated(true)
        }
        setLoading(false);
    }, [])

    

    const logout=()=>{
        setAuthUser(null);
        setIsAuthenticated(null);
        setToken(null)
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token')
    }
    
    const login = async (sapid, password)=>{
        try{
            const result = await AuthService.login(sapid, password)
            if (result.Success && result.Data) {
                const {Token, User} = result.Data
                setToken(Token)
                setAuthUser(User)
                localStorage.setItem('token', result.Data.Token)
                localStorage.setItem('currentUser', JSON.stringify(result.Data.User))
                return {...result}
            }
            return { ...result};
        }
        catch(error) {
            return error.response
        }
    }

    const generateOTP = async (user)=>{
        try {
            const result = await AuthService.generateOTP(user.Fullname, user.Email, user.UserName)
            return {...result}
        } catch (error) {
            const errorMessage = error.response?.data?.Message || error.message;
            return { ...error.response.data, Message:errorMessage };        
        }
    }


    const validateOTP = async (email, otp)=>{
        try {
            const result = await AuthService.validateOTP(email, otp)
            if (result.Success) {
                setIsAuthenticated(true)
            }
            return {...result}
        } catch (error) {
            const errorMessage = error.response?.data?.Message || error.message;
            return { ...error.response.data, Message:errorMessage };        
        }
    }    

    const values = {
        login,
        authUser,
        isAuthenticated,
        handleLogin,
        validateOTP,
        generateOTP,
        logout,
        loading,
        token
    }

    return(
        <AuthContext.Provider value={{...values}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = ()=>{
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context
}

export {AuthProvider, useAuth}