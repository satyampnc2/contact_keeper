import React,{useContext,useState, Fragment} from 'react'
import ContactContext from '../../contexts/Contacts/contactContext'
const Search = () => {
    const [search,setSearch] = useState('');
    const contactContext = useContext(ContactContext);
    const {setFilter,clearFilter} = contactContext;
    const onChange = (e) => {
        setSearch(e.target.value);
        setFilter(e.target.value);
    }
    const onSubmit = (e) =>{
        e.preventDefault();
    }

    const clrFilter = (e) => {
        clearFilter();
        setSearch('');
    }
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <input type="text" value={search} onChange={onChange} placeholder="Filter Contacts"/>
            </form>
            {search !== '' && <button className="btn btn-block bg-light" onClick={clrFilter}>Clear Filter</button> }
        </Fragment>
    )
}

export default Search
