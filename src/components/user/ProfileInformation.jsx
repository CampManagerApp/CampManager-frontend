import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './ProfileInformation.css'
export default function ProfileInformation(props){
    return(
      <div className='form-container'>
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Joel" disabled />
          </Form.Group>
  
          <Form.Group as={Col}>
            <Form.Label>Surname</Form.Label>
            <Form.Control placeholder="Aumedes" disabled />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>ID</Form.Label>
            <Form.Control placeholder="1234"disabled />
          </Form.Group>
  
          <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="Password" disabled />
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Carrer de Eurecat, 21" disabled />
        </Form.Group>
  
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>City</Form.Label>
            <Form.Control placeholder="Lleida" disabled/>
          </Form.Group>
  
          <Form.Group as={Col}>
            <Form.Label>State</Form.Label>
            <Form.Control placeholder="España" disabled/>
          </Form.Group>
  
          <Form.Group as={Col}>
            <Form.Label>Zip</Form.Label>
            <Form.Control placeholder="25001" disabled/>
          </Form.Group>
        </Row>
      </Form>
      </div>
    )
}