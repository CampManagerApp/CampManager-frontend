import './ItemTableList.css'
import { ListGroup } from "react-bootstrap";
import { useEffect } from 'react';
import ItemList from './ItemList';


export default function ItemTableListParticipants({ table = {}, template: Template, max_height = '50vh', onClickItem = () => { } }) {
    const days = 
        [
            {id:0, name: 'Dia1', tasks:[
                {id:0, description:"sadge", participants:"Juan, Pablo, Mario, Antonio"},
                {id:1, description:"bedge", participants:"Manolo, Tupac, Sergio, Duki"}
            ]},
            {id:1, name: 'Dia2', tasks:[
                {id:0, description:"who", participants:"Juan, Pablo, Mario, Antonio"},
                {id:1, description:"huh", participants:"Manolo, Tupac, Sergio, Duki"}
            ]}
        ]   
        
    useEffect(() => {
    }, [])

    return (
        <div>
            <ListGroup bsPrefix="item-list" className='scrollable-content' style={{height: max_height}}>
                {
                    table.participants.map((item, key) => {
                        if (Template === undefined) {
                            return <ListGroup.Item onClick={() => { onClickItem(item) }} key={key} >{item.name}
                            </ListGroup.Item>
                        }
                        return <ListGroup.Item key={key} onClick={() => { onClickItem(item) }} ><Template item={item} /></ListGroup.Item>
                    })
                }
            </ListGroup>    
        </div>

    )
}