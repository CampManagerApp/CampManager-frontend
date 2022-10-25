import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext()

const UserContextProvider  = (props) => {

    const [user, setUser] = useState([
        {
            id:uuidv4(),
            name: 'User 1',
            admin: 'Joel',
        },
        {
            id:uuidv4(),
            name: 'User 2',
            admin: 'Jordi',
        },
        {
            id:uuidv4(),
            name: 'User 3',
            admin: 'Alejandro',
        },
        {
            id:uuidv4(),
            name: 'Organisation 4',
            admin: 'Carlos',
        },
])

useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem('users')))
},[])

useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
})



const sortedUsers = users.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addUser = (name, user) => {
    setUser([...users , {id:uuidv4(), name, admin}])
}

const deleteUser = (id) => {
    setUser(users.filter(user => user.id !== id))
}

const updateUser = (id, updatedUser) => {
    setUser(users.map((user) => user.id === id ? updatedUser : user))
}

    return (
        <UserContext.Provider value={{sortedUsers, addUser, deleteUser, updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;