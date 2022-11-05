import { v4 as uuidv4 } from 'uuid';
import { loggedRequest } from "../../config";


export function getOrganisationMembers() {
    return [
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
        }
    ]
}