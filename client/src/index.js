import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import ContactState from './contexts/Contacts/ContactState'
import AlertState from './contexts/Alerts/AlertState'
import AuthState from  './contexts/Auth/AuthState'
ReactDOM.render(
  <ContactState>
    <AlertState>
      <AuthState>
        <App />
      </AuthState>
    </AlertState>
  </ContactState>,
  document.getElementById('root')
);

