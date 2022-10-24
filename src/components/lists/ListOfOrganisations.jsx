import Button from 'react-bootstrap/Button';
import './ListOfOrganisations.css'
import * as Icons from '../../design/icons.js'
import React, { useState, useEffect } from "react";
import PopUp from '../common/PopUp';
import Form from 'react-bootstrap/Form';
import { getOrganisation } from '../../services/superadmin/Organisations';

export default function ListOfOrganisations() {
  //it creates a state open with default as false
  const [buttonPopup, setButtonPopup] = useState(false)
  const [form, setForm] = useState({})
  //error is active or not, default false
  const [isActive, setIsActive] = useState(false)
  //3 states, waiting("W"), error("E"), correct("C") 
  const [organisation, setOrganisation] = useState("W")

  const [organisationForm, setOrganisationForm] = useState(true)
  let bool = false


  function handleError(error){
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
}


function handleSubmit(event) {
    onAdd(event)
}

function onAdd(event){
    console.log(getValue("code"))
    getOrganisation(getValue("code"))
    .then(form =>{ setOrganisation(form)
    if(form != null){setOrganisation("C")}else{setOrganisation("E")} })
    .catch(handleError, setOrganisation("E"))
}

  function onUpdate(e) {
      setForm({
          ...form,
          [e.target.id]: e.target.value
      })
  }

  function cancel() {
      setForm({})
  }

  useEffect(() => {
    console.log("entra" + organisation)
    if (organisation == "C"){
      setButtonPopup(false)
      setOrganisation("W")
    }else if(organisation == "E"){
      console.log(isActive)
      setIsActive(true)
      setOrganisation("W")
    }
  }, [organisation])


  function getValue(field) {
      return field in form ? form[field] : ''
  }

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
      <div>
        <button type="button" className="btn btn-primary" onClick={() => {
            setButtonPopup(true)
        }}>Add Organisation<Icons.AddOrganisation /></button>
      </div>
      <PopUp trigger={buttonPopup}>
          <div >
            <h3>Add organisation</h3>
            <Form className='p-5 p-sm-3 rounded' noValidate onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(form)
            }} id='inp'>
                <Form.Group className="mb-3" controlId="code">
                    <Form.Control onChange={onUpdate} type="text" placeholder="Add your new organisation code " />
                </Form.Group>
                <div className="d-grid gap-2 ">
                    <button type="submit" className="btn btn-primary"  id='btn-add'  onClick={() => {
                    }}>
                    Add <Icons.AddOrganisation/>
                    </button>
                    <p className="error" style={{
                      visibility: isActive ? 'visible' : 'hidden',
                      display: isActive ? 'contents' : 'none',
                    }}>Incorrect code</p>
                    <button type="button" className="btn btn-primary" id='btn-close' onClick={() => {
                        setButtonPopup(false)
                        setIsActive(false)
                    }}>Close <Icons.Close /></button>
                </div>
            </Form>
          </div>
      </PopUp>  
    </div>

/*export default function ListOfOrganisations({handleSubmit}) {
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
    
  );*/
  );
}