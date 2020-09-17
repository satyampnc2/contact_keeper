import React,{Fragment, useState,useContext,useEffect} from 'react'
import ContactContext from '../../contexts/Contacts/contactContext'
import AlertContext from '../../contexts/Alerts/alertContext'
const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const {addContact,current,clearCurrent,error,updateContact} = contactContext;
    const alertContext = useContext(AlertContext)
    const {setAlert} =  alertContext
    const [contact,setContact] = useState({
        name:'',
        email:'',
        phone:'',
        type:'personal',
        editable:false
    })
    const onChange = (e) =>{
        setContact({...contact,[e.target.name]:e.target.value})
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(current===null){
            addContact(contact)
            setContact({
                name:'',
                email:'',
                phone:'',
                type:'personal',
                editable:false
            })
        } else{
            let updatedContactInfo = {
                ...current,
                name:contact.name,
                email:contact.email,
                phone:contact.phone,
                type:contact.type,
            }
            updateContact(updatedContactInfo);
            clearCurrent();
        }
        
    }
    useEffect(()=>{
        if(error){
            if(Array.isArray(error)){
                error.forEach(err=>setAlert(err,"danger"))
            }else{
                setAlert(error,"danger")
            }
        } else{
            if(current){
                setContact({
                    name:current.name,
                    email:current.email,
                    phone:current.phone,
                    type: current.type,
                    editable:true
                })
            } else{
                setContact({
                    name:'',
                    email:'',
                    phone:'',
                    type:'personal',
                    editable:false
                })
            }
        }
        //eslint-disable-next-line
    },[contactContext,current,error])
    return (
        <Fragment>
            <div className="text-center text-primary">{contact.editable ? "Edit Contact" : "Add Contact"}</div>
            <form onSubmit={onSubmit}>
                <input type="text" name="name" value={contact.name} onChange={onChange} placeholder="Name"/>
                <input type="email" name="email" value={contact.email} onChange={onChange} placeholder="Email"/>
                <input type="text" name="phone" value={contact.phone} onChange={onChange} placeholder="Phone"/>
                <div>Contact Type</div>
                <input type="radio" name="type" onChange={onChange} value="personal" checked={contact.type === 'personal'}/>Personal{' '}
                <input type="radio" name="type" onChange={onChange} value="professional" checked={contact.type === 'professional'}/>Professional
                <input type="submit" value="Submit" className="btn btn-block bg-primary"/>
            </form>
            {contact.editable === true && <button onClick={clearCurrent} className="btn btn-block">Clear</button> }
        </Fragment>
    )
}

export default ContactForm
