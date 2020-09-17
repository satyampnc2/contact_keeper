import React,{useContext} from 'react';
import './App.css';
import Nav from './components/layouts/Nav';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import Home from './components/pages/Home'
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Alert from './components/layouts/Alert'
import setAuthToken from './utils/setAuthToken'
import AuthContext from './contexts/Auth/authContext'
function App(props) {
  const authContext = useContext(AuthContext)
  const {getUser,user,isAuthenticated} = authContext;
  if(localStorage.jwtToken === undefined){
    setAuthToken(localStorage.getItem("jwtToken"))
  }
  else if(!user){
    setAuthToken(localStorage.getItem("jwtToken"))
    if(!user)
    getUser();
  }
  return (
    <Router>
      <Nav/>
      <div className="component mx-3">
        <Alert/>
        <Switch>
          <Route exact path ="/" render={()=> !isAuthenticated ? (
            <Redirect to="/login" />
          ) : (
            <Home/>
          )}></Route>
          <Route exact path ="/register" component={Register}></Route>
          <Route exact path ="/login" component={Login}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
