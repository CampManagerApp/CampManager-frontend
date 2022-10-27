import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext()

const UserContextProvider  = (props) => {

    const [users, setUser] = useState([
        {
            id:uuidv4(),
            name: 'User 1',
            status: 'Online',
            admin: 'Joel',
            role:'admin'
        },
        {
            id:uuidv4(),
            name: 'User 2',
            status: 'Online',
            admin: 'Jordi',
            role:'admin'
        },
        {
            id:uuidv4(),
            name: 'User 3',
            status: 'Online',
            admin: 'Alejandro',
            role:'admin'
        },
        {
            id:uuidv4(),
            name: 'Organisation 4',
            status: 'Online',
            admin: 'Carlos',
            role:'admin'
        },

        {
            id:uuidv4(),
            name: 'Organisation 5',
            status: 'Online',
            admin: 'kooo',
            role:'admi1n'
        },
])


const users_list = users.map((user) => {return user})



const addUser = (name, user, admin) => {
    setUser([...users , {id:uuidv4(), name, admin}])
}

const deleteUser = (id) => {
    setUser(users.filter(user => user.id !== id))
}

const updateUser = (id, updatedUser) => {
    setUser(users.map((user) => user.id === id ? updatedUser : user))
}

    return (
        <UserContext.Provider value={{users_list, addUser, deleteUser, updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;