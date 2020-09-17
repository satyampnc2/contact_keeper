import React,{useReducer} from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import {REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS, LOGOUT} from '../types' 
import setAuthToken from '../../utils/setAuthToken'
const AuthState = (props) => {
    const initialState = {
        token:localStorage.getItem("jwtToken"),
        isAuthenticated : false,
        isLoading:true,
        user:null,
        errors:null
    }

    const [state,dispatch ] = useReducer(AuthReducer,initialState)

    const getUser = async () => {
        setAuthToken(localStorage.getItem('jwtToken'))
        try{
            const res = await axios.get('/api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        }catch(err){
            dispatch({
                type:AUTH_ERROR
            })
        }
    }

    const register = async userData => {
        const config ={
            headers: {
                "Content-Type" :  "application/json"
            }
        }

        try{
            const res = await axios.post('/api/users',userData,config);
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            // getUser();
        }
        catch(err){
            dispatch({
                type:REGISTER_FAIL,
                payload: err.response.data.error
            })
        }
    }
    
    const clearError = () => {
        dispatch({
            type:CLEAR_ERRORS
        })
    }
    const login = async userData => {
        const config ={
            headers: {
                "Content-Type" :  "application/json"
            }
        }

        try{
            const res = await axios.post('/api/auth',userData,config);
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
        }
        catch(err){
            dispatch({
                type:LOGIN_FAIL,
                payload:err.response.data.error
            })
        }
    }
    
    const logout = () => {
        dispatch({
            type:LOGOUT,
            payload:null
        })
    }
    return (
        <AuthContext.Provider
            value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                isLoading:state.isLoading,
                user:state.user,
                errors:state.errors,
                register,
                getUser,
                login,
                clearError,
                logout
            }}
        >
            {props.children}        
        </AuthContext.Provider>
    )
}

export default AuthState
