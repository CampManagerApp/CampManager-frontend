import Button from 'react-bootstrap/Button';
import { IconContext } from 'react-icons';
import * as Icons from '../../design/icons.js'
import React, { useContext, useEffect, useState } from "react";
import ModalSimple from '../modal/ModalSimple';
import TableHeaderItem from './TableHeaderItem.jsx';
import './ListTable.css'
import ConfirmationModal from '../modal/ConfirmationModal.jsx';
import { MessageContext } from '../../context/MessageContex.jsx';
import Col from 'react-bootstrap/Col';

export default function ListTable({ children, list, onDelete, onAdd, onUpdate }) {
    const [modalShow, setModalShow] = useState(false);
    const [modalShowDelete, setModalShowDelete] = useState(false);
    const [item, setitem] = useState({});
    const {showConfirmationModal} = useContext(MessageContext)

    useEffect(()=> {
    
    }, [])

    function delete_item(id) {
        onDelete(id)
    }  
    
    
    return (
        <div>
            <ModalSimple item={item} show={modalShow} onHide={() => setModalShow(false)} />
            <div className='container '>
                <div className="scrollable-table">
                    <table className="table table-hover" id="job-table">
                        <thead>
                            <tr className="text-center">
                                <TableHeaderItem>index</TableHeaderItem>
                                {children}
                                <TableHeaderItem>Actions</TableHeaderItem>
                            </tr>
                        </thead>
                        <tbody className="text-center tableBody">
                            {list.map((org, i) => {
                                return (
                                    <tr key={i} onClick={() => {
                                        setitem(org)
                                        setModalShow(true)
                                    }}
                                        className="pointer-row">
                                        <th scope="row">{i}</th>
                                        {children.map(function (item, key) {
                                            return (
                                                <td key={key}>{org[item.props.children.toLowerCase()]}</td>
                                            )
                                        })}
                                        <td onClick={e => e.stopPropagation()} width="200px">
                                        <button type="button" class="btn btn-danger button-delete" onClick={() => {
                                                showConfirmationModal(() => {delete_item(org.id)})
                                            }}><span class="d-none d-lg-inline d-print-flex">Delete</span><i class="bi bi-trash"></i></button>
                                             {/* <Button type="button" className="btn btn-danger" onClick={() => {
                                                showConfirmationModal(() => {delete_item(org.id)})
                                            }}><Col lg="6" className="d-none d-lg-inline">Delete</Col> <IconContext.Provider value={{ className: 'react-icons' }}><Icons.Delete /></IconContext.Provider></Button> */}
                                        <button type="button" class="btn btn-primary" onClick={() => { onUpdate(org.id) }}>
                                            <span class="d-none d-lg-inline d-print-flex">Edit</span><i class="bi bi-pen"></i>
                                        </button>
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
