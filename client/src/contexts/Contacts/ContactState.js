import React,{useReducer} from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import axios from 'axios'
import {ADD_CONTACT,DELETE_CONTACT,SET_CURRENT,GET_CONTACTS,UPDATE_CONTACT, CLEAR_CONTACTS,CLEAR_CURRENT,CONTACT_ERROR,FILTER_CONTACTS,CLEAR_FILTER} from '../types'
const ContactState = (props) => {
    const initialState = {
        contacts:null,
        filtered:null,
        current:null,
        error:null
    }
    const [state,dispatch] = useReducer(ContactReducer,initialState); 

    const getContacts = async () => {
        const res = await axios.get('/api/contacts');
        dispatch({
            type:GET_CONTACTS,
            payload:res.data
        })
    }

    const clearContacts = () => {
        dispatch({
            type:CLEAR_CONTACTS
        })
    }
    const updateContact = async (contact) => {
        try{
            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config);
            dispatch({
                type:UPDATE_CONTACT,
                payload:res.data
            })
        } catch(err){
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.data.error
            })
        }
    }

    const addContact = async (contact) =>{
        const config = {
            headers:{
                "Content-Type" : "application/json"
            }
        }
        try{
            const res = await axios.post('/api/contacts',contact,config);
            dispatch({
                type:ADD_CONTACT,
                payload:res.data
            })
        } catch(err){
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.data.error
            })
        }
        
    }
    
    const deleteContact = async (id) => {
        try{
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type:DELETE_CONTACT,
                payload:id
            })
        } catch(err){
            dispatch({
                type:CONTACT_ERROR,
                payload:err.response.data.error
            })
        }
    }
    
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload:contact
        })
    }

    const clearCurrent = () => {
        dispatch({
            type:CLEAR_CURRENT
        })
    }

    const setFilter = (text) => {
        dispatch({
            type:FILTER_CONTACTS,
            payload:text
        })
    }
    const clearFilter = () => {
        dispatch({
            type:CLEAR_FILTER
        })
    }
    return (
        <ContactContext.Provider
            value={{
                contacts:state.contacts,
                filtered:state.filtered,
                editable:state.editable,
                current:state.current,
                error:state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                setFilter,
                clearFilter,
                getContacts,
                updateContact,
                clearContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
