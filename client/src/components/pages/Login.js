import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/Auth/authContext'
import AlertContext from '../../contexts/Alerts/alertContext'
const Login = (props) => {
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const {login,errors,clearError,isAuthenticated} = authContext;
    const {setAlert} = alertContext
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
    useEffect(()=>{
        if(errors !== null){
            if(Array.isArray(errors))
            errors.forEach(error => setAlert(error,"danger"))
            else
            setAlert(errors,"danger")
            clearError();
        }
        if(isAuthenticated){
            props.history.push("/")                                         
        }
        //eslint-disable-next-line
    },[errors,isAuthenticated,props.history])
    const onSubmit = (e) => {
        e.preventDefault();
        login(user)
    }
    return (
        <div className="form-container">
            <h1 className="large ">User <span className="text-success">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} name="email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={user.password} onChange={onChange}/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                <p>Not a member? <Link to="/register"><span className="text-success">Register Here</span></Link></p>
            </form>
        </div>
    )
}

export default Login