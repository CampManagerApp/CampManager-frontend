import Button from 'react-bootstrap/Button';
import './ListOfOrganisations.css'

export default function ListOfOrganisations({handleSubmit}) {
  return (
    <div className='list-group-page-wrapper'>
      <h3 className='title'>Select an organisation</h3>
      <div class="list-group list-group-light">
        <a onClick={handleSubmit} class="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-primary pointer-item">
          Organisation 1</a>
        <a onClick={handleSubmit} class="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-secondary pointer-item">
          Organisation 2</a>
        <a onClick={handleSubmit} class="list-group-item list-group-item-action px-3 border-0 rounded-3 mb-2 list-group-item-success pointer-item">
          Organisation 3</a>
        </div>
        <br></br>
        <Button variant="success">Add organisation</Button>
    </div>
    
  );
}
