import ListGroup from 'react-bootstrap/ListGroup';
import './ProfileCard.css'

export default function ProfileCard({ children, list, onDelete, onAdd, onUpdate }) {
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
    
    return (
        <div class="d-flex justify-content-center">
        <ListGroup defaultActiveKey="#link1" className='row'>
            <ListGroup.Item action onClick={alertClicked}>
            Colònies Estiu 2023
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
            Colònies Joves 2023
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
            Colònies Joves 2023
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
            Colònies Joves 2023
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked}>
            Colònies Joves 2023
            </ListGroup.Item>
        </ListGroup>
        </div>

    );
}