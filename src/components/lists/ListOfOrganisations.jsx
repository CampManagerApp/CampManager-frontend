import ListGroup from 'react-bootstrap/ListGroup';
import './ListOfOrganisations.css'

export default function ListOfOrganisations() {
  return (
    <div className='test-page-wrapper'>
    <ListGroup>
      <ListGroup.Item action variant="secondary">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="success">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
      <ListGroup.Item action variant="danger">
        Organiation 1
      </ListGroup.Item>
    </ListGroup>
    </div>
  );
}
