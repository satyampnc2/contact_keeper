import {ADD_CONTACT,DELETE_CONTACT,SET_CURRENT,GET_CONTACTS,UPDATE_CONTACT, CLEAR_CONTACTS,CONTACT_ERROR,CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER} from '../types'

export default (state,action) =>{
    switch(action.type){
        case GET_CONTACTS:
            return{
                ...state,
                contacts: action.payload
            }
        case CLEAR_CONTACTS:
            return{
                ...state,
                contacts:null
            }
        case ADD_CONTACT:
            return{
                ...state,
                contacts:[...state.contacts,action.payload]
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts:state.contacts.filter(contact=> contact._id !== action.payload)
            }
        case UPDATE_CONTACT:
            let filteredContact = state.contacts.filter(contact=> contact._id !== action.payload._id)
            return{
                ...state,
                contacts:[...filteredContact,action.payload]
            }
        case SET_CURRENT:
            return {
                ...state,
                current:action.payload
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current:null
            }
        case FILTER_CONTACTS:
            return{
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered:null
            }
        case CONTACT_ERROR:
            return{
                ...state,
                error:action.payload
            }
        default:
            return state
    }
}
