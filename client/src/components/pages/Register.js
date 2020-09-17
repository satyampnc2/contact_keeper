import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/Auth/authContext'
import AlertContext from '../../contexts/Alerts/alertContext'
const Register = (props) => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const {setAlert} = alertContext;
    const {register,errors,clearError,isAuthenticated} = authContext;
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
        register(user);
    }
    return (
        <div className="form-container">
            <h1 className="large ">User <span className="text-success">Register</span></h1>
            <form  onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={user.name} name="name" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} name="email" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={user.password} onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Confirm Password</label>
                    <input type="password" name="password2" value={user.password2} onChange={onChange}/>
                </div>
                <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                <p>Already a member? <Link to="/login"><span className="text-success">Sign In</span></Link></p>
            </form>
        </div>
    )
}
export default Register