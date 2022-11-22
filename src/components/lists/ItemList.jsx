import './ItemList.css'
import { ListGroup } from "react-bootstrap";


export default function ItemList({ items = [], template: Template, onClickItem = () => { } }) {
    return (
        <ListGroup bsPrefix="item-list" className='scrollable-content'>
            {
                items.map((item, key) => {
                    if (Template === undefined) {
                        return <ListGroup.Item onClick={() => { onClickItem(item) }} key={key} >{item}</ListGroup.Item>
                    }
                    return <ListGroup.Item key={key} onClick={() => { onClickItem(item) }} ><Template item={item} /></ListGroup.Item>
                })
            }
        </ListGroup>
    )
}