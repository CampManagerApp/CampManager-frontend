import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const UserContext = createContext()

const UserContextProvider  = (props) => {

    const [users, setUser] = useState([
        {
            id:uuidv4(),
            name: 'USER1',
            role:'admin'
        },
        {
            id:uuidv4(),
            name: 'USER2',
            role:'admin'
        },
        {
            id:uuidv4(),
            name: 'USER3',
            role:'cousellor'
        },
        {
            id:uuidv4(),
            name: 'USER3',
            role:'cousellor'
        },

        {
            id:uuidv4(),
            name: 'USER4',
            role:'admin'
        },
])


const users_list = users.map((user) => {return user})



const addUser = (name, role) => {
    setUser([...users , {id:uuidv4(), name, role}])
}

const deleteUser = (id) => {
    setUser(users.filter(user => user.id !== id))
}

const updateUser = (id, updatedUser) => {
    setUser(users.map((user) => user.id === id ? updatedUser : user))
}

const getUser = (id) => {
    return users.filter(user => user.id == id)
}

    return (
        <UserContext.Provider value={{users_list, getUser, addUser, deleteUser, updateUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;