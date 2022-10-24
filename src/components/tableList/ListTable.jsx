import Button from 'react-bootstrap/Button';
import { IconContext } from 'react-icons';
import * as Icons from '../../design/icons.js'
import React, { useState } from "react";
import ModalOrganisation from '../modal/ModalOrganisation.jsx';

import './ListTable.css'

export default function ListTable({ list, onDelete, onAdd, onUpdate}) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div>
            <ModalOrganisation show={modalShow} onHide={() => setModalShow(false)}/>
        <div className='container '>
            <div className="scrollable-table">
                <table className="table table-hover" id="job-table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col" >Index</th>
                            <th scope="col" >Organization Name</th>
                            <th scope="col" >ID</th>
                            <th scope="col" >Admin</th>
                            <th scope="col" >Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center tableBody">
                        {list.map((org, i) => {
                            return (
                                <tr key={i} onClick={() => setModalShow(true)} className="pointer-row">
                                    <th scope="row">{i}</th>
                                    <td>{org.name}</td>
                                    <td>{org.id}</td>
                                    <td>{org.admin}</td>
                                    <td onClick={e => e.stopPropagation()} width="200px">
                                        <Button type="button" className="btn btn-danger" onClick={() => {
                                            onDelete(org.id)
                                        }}>Delete <IconContext.Provider value={{ className: 'react-icons' }}><Icons.Delete/></IconContext.Provider></Button>{' '}
                                        <Button type="button" className="btn btn-primary" onClick={() =>{onUpdate(org.id)}}>
                                            Edit 
                                            <IconContext.Provider value={{ className: 'react-icons' }}><Icons.Edit /></IconContext.Provider>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <br></br>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={() => {
                    onAdd()
                }}>Add <Icons.AddOrganisation /></button>
            </div>
        </div>
        </div>
        
    );
}
  