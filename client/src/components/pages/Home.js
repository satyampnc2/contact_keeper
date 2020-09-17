import React,{Fragment} from 'react'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
const Home = () => {
    return (
        <Fragment>
            <div className="grid-2">
                <div>
                    <ContactForm/>
                </div>
                <div>
                    <Contacts/>
                </div>
            </div>
        </Fragment>
    )
}

export default Home
