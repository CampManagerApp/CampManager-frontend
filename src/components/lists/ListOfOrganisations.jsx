import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './ListOfOrganisations.css'
import * as Icons from '../../design/icons.js'
import React, { useState, useEffect } from "react";
import PopUp from '../common/PopUp';
import Form from 'react-bootstrap/Form';
import { getOrganisation } from '../../services/superadmin/Organisations';
import { useContext } from 'react';
import { UserOrganisationsContex } from '../../context/UserOrganisationsContex';
import { Col, Container, Row } from 'react-bootstrap';

export default function ListOfOrganisations({ handle }) {
  //it creates a state open with default as false
  const [buttonPopup, setButtonPopup] = useState(false)
  const [form, setForm] = useState({})
  //error is active or not, default false
  const [isActive, setIsActive] = useState(false)
  //3 states, waiting("W"), error("E"), correct("C") 
  const [organisation, setOrganisation] = useState("W")
  const { orgList, addOrg } = useContext(UserOrganisationsContex)

  function handleError(error) {
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

  function onAdd(event) {
    console.log(getValue("code"))
    getOrganisation(getValue("code"))
      .then(form => {
        setOrganisation(form)
        if (form != null) { setOrganisation("C") } else { setOrganisation("E") }
      })
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

  }, [organisation])


  function getValue(field) {
    return field in form ? form[field] : ''
  }

  return (
    <div className='list-group-page-wrapper'>
      <div className="list-group list-group-light">
        {orgList.map((org, key) => {
          return (
            <a key={key} onClick={handle} className="list-group-item list-group-item-action px-5 border-4 pointer-item">
              {org.name}
            </a>)
        })
        }
      </div>
      <br></br>
      <Container>
        <Row>
          <Col>
            <button type="button" className="btn btn-primary" onClick={() => {
              setButtonPopup(true)
            }}>External User</button>
          </Col>
          <Col>
            <button type="button" className="btn btn-primary" onClick={() => {
              setButtonPopup(true)
            }}>Add Organisation</button>
          </Col>
        </Row>
      </Container>
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
              <button type="submit" className="btn btn-primary" id='btn-add' onClick={() => {
                addOrg({ name: 'OrgTest' })
              }}>
                Add <Icons.AddOrganisation />
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
  );
}