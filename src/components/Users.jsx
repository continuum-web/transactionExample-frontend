import React from 'react';
import { getUsers } from '../utils/apicalls'
import { useState, useEffect } from 'react';
import UserCard from './UserCard'

export default function Users() {
	const [ users, setUsers ] = useState([]);
	useEffect(() => {
        getUsers().then((data) => { 
            
            setUsers(data)
        })
        return 
    }, [])
  
	return (
        <div className="users Container">
            {users.map(({doc}) => {
               return <UserCard key={ doc._id} user={doc} setUsers={setUsers}/>
            })}
		</div>
	);
}
