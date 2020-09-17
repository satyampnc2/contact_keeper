import React,{useContext} from 'react'
import AlertContext from '../../contexts/Alerts/alertContext'
const Alert = () => {
    const alertContext = useContext(AlertContext)
    const {alerts} = alertContext
    return (
            alerts.length >0 && <div className="alert all-center mx-2 bg-danger">
            {alerts.map(alert =><i key={alert.id} className="fa fa-exclamation-triangle"><span>{' '}{alert.msg}</span></i>)}
            </div>
        
    )
}

export default Alert
