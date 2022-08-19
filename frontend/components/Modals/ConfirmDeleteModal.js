import React, { useState, useEffect } from "react";
import Select from 'react-select'
import useApiHelper from "../../api";
import { makeEnumFriendly, enumList } from "../../enum";
import { useRouter } from "next/router";
import Modal from 'react-bootstrap/Modal';

const ConfirmDelete = (props) => {
    const api = useApiHelper();

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>You can't restore the data anymore!</span>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-end">
                    <button onClick={props.handleClose} className="btn btn-secondary me-2">Cancel</button>
                    <button onClick={() => props.deleteStudent(props.deleteId)} className="btn btn-danger">Confirm Delete</button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDelete;