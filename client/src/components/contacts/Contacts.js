import React,{useContext,useEffect} from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../contexts/Contacts/contactContext'
import Search from '../layouts/Search'
import Spinner from '../layouts/Spinner'
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts,filtered,getContacts} = contactContext;
    useEffect(()=>{
        getContacts();
        //eslint-disable-next-line
    },[])
    return (
        <div>
            <Search/>
            { (contacts !== null) ?  (filtered === null ? 
            (contacts.length>0 ? contacts.map(contact => <ContactItem key={contact._id} contactInfo={contact}/>) :
            <p>No contacts to show</p>
            ) :
            (filtered.length>0 ? filtered.map(contact => <ContactItem key={contact._id} contactInfo={contact}/>):
            <p>No mactching contact found</p>
            )) :
            <Spinner/>
            }
        </div>
    )
}

export default Contacts
