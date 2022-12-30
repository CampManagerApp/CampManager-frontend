import './ItemTableList.css'
import { ListGroup } from "react-bootstrap";
import { useEffect } from 'react';
import ItemList from './ItemList';
import ItemTableListParticipants from './ItemTableListParticipants';


export default function ItemTableList({ table = [], template: Template, max_height = '50vh', onClickItem = () => { } }) {
    /*

    Example format: 
    const days = 
        [
            {id:0, name: 'Dia1', tasks:[
                {id:0, description:"sadge", participants:[{name:'Juan'}, {name:'Pablo'}, {name:'Mario'}, {name:'Antonio'}]},
                {id:1, description:"bedge", participants:[{name:'Juan'}, {name:'Pablo'}, {name:'Mario'}, {name:'Antonio'}]}
            ]},
            {id:1, name: 'Dia2', tasks:[
                {id:0, description:"who", participants:[{name:'Juan'}, {name:'Pablo'}, {name:'Mario'}, {name:'Antonio'}]},
                {id:1, description:"huh", participants:[{name:'Juan'}, {name:'Pablo'}, {name:'Mario'}, {name:'Antonio'}]}
            ]}
        ]   
    */
    return (
        <div className='scrollable-content'>
             <ListGroup bsPrefix="item-list" className='scrollable-content' style={{height: max_height}}>
                {
                    table.map((day, key) => {
                        return <div> <ListGroup.Item className='item-list-day' onClick={() => { onClickItem(day) }} key={key} >{day.name}
                        </ListGroup.Item>
                        <ListGroup >
                            {
                                day.tasks.map((item, key) => {
                                    if (Template === undefined) {
                                            return <div key={key}>
                                            <ListGroup.Item className='item-list-activity' onClick={() => { onClickItem(item) }} >{item.description}
                                            </ListGroup.Item>
                                            <ListGroup>
                                                {
                                                    item.participants.map((item2, key) => {
                                                        return <ListGroup.Item className='item-list-participant' onClick={() => { onClickItem(item2) }} key={key} >{item2.name}
                                                        </ListGroup.Item>
                                                    })
                                                }
                                            </ListGroup>

                                        </div>
                                    }
                                    return <ListGroup.Item key={key} onClick={() => { onClickItem(item) }} ><Template item={item} /></ListGroup.Item>
                                })
                            }
                        </ListGroup>    
                </div>})
                }
            </ListGroup>
        </div>

    )
}