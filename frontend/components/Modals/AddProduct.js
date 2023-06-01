import React, { useState, useEffect } from "react";
import Select from 'react-select'
import useApiHelper from "../../api";
import { makeEnumFriendly, getEnumList, getEnumItem } from "../../enum";
import Modal from 'react-bootstrap/Modal';

const AddProduct = (props) => {
  const api = useApiHelper();
  const [categories, setCategories] = useState([])
  const [brand, setBrand] = useState([])

  useEffect(() => {
    Promise.all([
      api.categoryList(),
      api.brandList()
    ]).then(response => {
      setCategories(makeEnumFriendly(response[0]))
      setBrand(makeEnumFriendly(response[1]))
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
          {props.edit ? "Edit Product" : "Add Product"}
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
                <label className="form-label" htmlFor="price">Price</label>
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  value={props.formData.price ? props.formData.price : ""}
                  onChange={props.handleChange}
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="address">Brand</label>
              <Select
                onChange={(e) => {
                  props.setFormData({ ...props.formData, brand: e.value })
                }}
                options={brand}
                value={getEnumItem(brand, props?.formData?.brand)}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="address">Categories</label>
              <Select
                isMulti
                onChange={(e) => {
                  const hValue = e.map(val => val.value)
                  props.setFormData({ ...props.formData, categories: hValue })
                }}
                options={categories}
                value={getEnumList(categories, props?.formData?.categories)}
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

export default AddProduct;