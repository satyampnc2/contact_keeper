import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../contexts/Auth/authContext'
import ContactContext from '../../contexts/Contacts/contactContext'
const Nav = () => {
    const contactContext = useContext(ContactContext)
    const authContext = useContext(AuthContext)

    const {clearContacts} = contactContext;
    const {isAuthenticated,user,logout} = authContext

    const logoutHandler = () => {
        logout()
        clearContacts()
    }
    return (
        <div className="navbar bg-primary">
            <h2 ><i className="fa fa-address-book"></i>{' '}Contact Finder</h2>
            <ul>
                {user ? <li>Hello,{user.name}</li>:<li><Link to="/register">Register</Link></li>}
                {isAuthenticated ? <li><Link onClick={logoutHandler} to="/register">Logout</Link></li>:<li><Link to="/login">Login</Link></li>}
            </ul>
        </div>
    )
}

export default Nav
