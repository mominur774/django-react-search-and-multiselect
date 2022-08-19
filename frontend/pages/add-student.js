import React, { useState, useEffect } from "react";
import Select from 'react-select'
import useApiHelper from '../api'
import { makeEnumFriendly } from "../enum";
import { useRouter } from "next/router";
import Modal from 'react-bootstrap/Modal';

const AddStudent = () => {
  const [formData, setFormData] = useState({});
  const [hobby, setHobby] = useState([]);
  const api = useApiHelper();
  const router = useRouter();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    api.addStudent(formData).then(res => {
      router.push('/')
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    api.hobbyList().then(res => {
      setHobby(makeEnumFriendly(res))
    }).catch(error => {
      console.log(error)
    })
  }, [])



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>


        <div>
          <div className="row my-5">
            <h3 className="text-center">Add Student</h3>
            <div className="col-lg-6 mx-auto">
              <form onSubmit={handleSubmit} action="">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input className="form-control" type="text" name="name" onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input className="form-control" type="email" name="email" onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="department">Department</label>
                  <input className="form-control" type="text" name="department" onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input className="form-control" type="text" name="address" onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="address">Hobby</label>
                  <Select
                    isMulti
                    onChange={(e) => {
                      const hValue = e.map(val => val.value)
                      setFormData({ ...formData, hobby: hValue })
                    }}
                    options={hobby}
                  />
                </div>
                <button className="btn btn-primary w-100 my-3" type="submit">Add</button>
              </form>
            </div>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  )
}

export default AddStudent;