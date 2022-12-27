import './ListOfOrganisations.css'
import React, { useState, useEffect } from "react";
import { getOrganisation } from '../../services/superadmin/Organisations';
import { useContext } from 'react';
import { UserOrganisationsContex } from '../../context/UserOrganisationsContex';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { UserStatusContext } from '../../context/UserStatusContext';

export default function ListOfOrganisations({ handle }) {
  const { t, i18n } = useTranslation('common');
  //it creates a state open with default as false
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false)
  const [form, setForm] = useState({})
  //error is active or not, default false
  const [isActive, setIsActive] = useState(false)
  //3 states, waiting("W"), error("E"), correct("C") 
  const [organisation, setOrganisation] = useState("W")
  const [orgList, setOrgList] = useState([])
  const { addOrg, get_organisations } = useContext(UserOrganisationsContex)
  const { userInfo } = useContext(UserStatusContext)


  useEffect(() => {
    loadOrganisations()
  }, [])


  function loadOrganisations() {
    const { username } = userInfo
    console.log(`username:${username}`)
    get_organisations(username).then((organisations) => {
      setOrgList(organisations)
    })
  }

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
    event.preventDefault();
    event.stopPropagation();
    onAdd(event)
  }

  function onAdd(event) {
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


  function getValue(field) {
    return field in form ? form[field] : ''
  }

  return (
    <div className='list-group-page-wrapper' style={{height: '100%'}}>
      <div className="list-group list-group-light scrollable-content" style={{height: '65%'}}>
        {orgList.map((org, key) => {
          return (
            <a key={key} onClick={() => { handle(org) }} className="list-group-item list-group-item-action px-5 border-4 pointer-item">
              {org.name}
            </a>)
        })
        }
      </div>
      <br></br>
      <Container>
        <Row>
          <div>
            <button type="button" className="btn btn-primary m-3" onClick={() => {

            }}>{t('SELECT_ORGANISATION.EXTERNAL_USER')}</button>
            <button type="button" className="btn btn-primary" onClick={() => {
              navigate('/user/listoforganisations/add/')
            }}>{t('SELECT_ORGANISATION.ADD_ORGANISATION_BUTTON')}</button>
          </div>
        </Row>
      </Container>
    </div>
  );
}