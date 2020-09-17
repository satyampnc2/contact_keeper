import React,{useContext,useEffect} from 'react'
import ContactContext from '../../contexts/Contacts/contactContext'
import AlertContext from '../../contexts/Alerts/alertContext'
const ContactItem = (props) => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext)
    const {deleteContact,setCurrent,error} = contactContext;
    const {setAlert} = alertContext
    const {name,email,phone,type} = props.contactInfo
    useEffect(()=>{
        if(error !== null){
            setAlert(error,"danger")
        }
        //eslint-disable-next-line
    },[error])
    return (
        <div className="card bg-light my-1">
            <div className={"badge "+ (type === 'personal' ? "bg-danger" : "bg-success")} style={{float:'right'}}>{type}</div>
            <div className="text-primary">{name}</div>
            <div><i className="fa fa-envelope"></i>{' '}{email}</div>
            <div><i className="fa fa-phone"></i>{' '}{phone}</div>
            <button onClick={()=>setCurrent(props.contactInfo)} className="btn btn-sm bg-dark">Edit</button>
            <button onClick={()=>deleteContact(props.contactInfo._id)} className="btn btn-sm bg-danger">Delete</button>
        </div>
    )
}

export default ContactItem
