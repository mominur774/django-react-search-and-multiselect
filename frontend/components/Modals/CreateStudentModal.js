import React, { useState, useEffect } from "react";
import Select from 'react-select'
import useApiHelper from "../../api";
import { makeEnumFriendly, getEnumList } from "../../enum";
import Modal from 'react-bootstrap/Modal';

const AddStudent = (props) => {
  const api = useApiHelper();
  const [hobbies, setHobbies] = useState([])

  useEffect(() => {
    api.hobbyList().then(res => {
      setHobbies(makeEnumFriendly(res))
    })
  }, [])

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.edit ? "Edit Student" : "Add Student"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="row" onSubmit={(e) => props.handleSubmit(e, props?.formData?.id)} action="">
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={props.formData.name ? props.formData.name : ""}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={props.formData.email ? props.formData.email : ""}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="department">Department</label>
                <input
                  className="form-control"
                  type="text"
                  name="department"
                  value={props.formData.department ? props.formData.department : ""}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  value={props.formData.address ? props.formData.address : ""}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="address">Hobby</label>
              <Select
                isMulti
                onChange={(e) => {
                  const hValue = e.map(val => val.value)
                  props.setFormData({ ...props.formData, 'hobby': hValue })
                }}
                options={hobbies}
                value={getEnumList(hobbies, props?.formData?.hobby)}
              />
            </div>
            <div className="col-lg-6">
              <button className="btn btn-primary" type="submit">
                {props.edit ? "Edit" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AddStudent;