import './ItemList.css'
import { ListGroup } from "react-bootstrap";





export default function ItemList({ items = [], template: Template, max_height = '50vh', onClickItem = () => { }, onUpdate = () => { } }) {
    return (
        <div>
            <ListGroup bsPrefix="item-list" className='scrollable-content flex-container flex-item' style={{ max_Height: max_height, height: '100%' }}>
                {
                    items.map((item, key) => {
                        if (Template === undefined) {
                            return <ListGroup.Item onClick={() => { onClickItem(item) }} key={key} >{item}</ListGroup.Item>
                        }
                        return <ListGroup.Item key={key} onClick={() => { onClickItem(item) }} ><Template item={item} onUpdate={onUpdate} /></ListGroup.Item>
                    })
                }
            </ListGroup>
        </div>
    )
}