import {REGISTER_FAIL,REGISTER_SUCCESS,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,CLEAR_ERRORS, LOGOUT} from '../types' 

export default (state,action) => {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("jwtToken",action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated :  true,
                isLoading:false
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("jwtToken")
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false,
                user:null,
                errors:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                errors:null
            }
        case AUTH_ERROR:
            localStorage.removeItem("jwtToken")
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                isLoading:false,
                user:null
            }
        default:
            return state
    }
}