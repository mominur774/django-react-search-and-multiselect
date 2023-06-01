import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';
import { makeEnumFriendly } from '../../enum';
import { useRouter } from 'next/router';
import { Pagination } from '../Pagination';
import { Checkbox, Order, Search } from '../Filter';
import { Table } from '../Content';
import { AddProduct } from '../Modals';
import { toast } from 'react-toastify';

const Products = (props) => {
  const api = useApiHelper();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const productList = () => {
    api.productList(router.query).then(res => {
      setProducts(res)
    })
  }


  const addQuery = (key, value) => {
    router.query = { ...router.query, [key]: value }
    router.push(router)
  }

  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setFormData({});
  }

  const handleModalShow = (e, id = '') => {
    e.preventDefault();
    setShow(true)

    if (id) {
      setEdit(true);
      api.productDetails(id).then(res => {
        setFormData(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (!id) {
      api.addProduct(formData).then(res => {
        handleClose();
        productList();
        toast.success('Student added Successfully');
      }).catch(error => {
        console.log(error)
      })
    } else {
      api.updateProduct(id, formData).then(res => {
        handleClose();
        productList();
        toast.success('Student updated Successfully');
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    setProducts(props?.data)
  }, [router.query])


  useEffect(() => {
    Promise.all([
      api.categoryList(),
      api.brandList()
    ]).then(res => {
      setCategories(makeEnumFriendly(res[0]))
      setBrands(makeEnumFriendly(res[1]))
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (<>
    <div className='row'>
      <div className="col-lg-11 mx-auto">
        <div className="row mt-3">
          <div className="col-lg-3 col-md-3 mt-4">
            <div>
              <a onClick={(e) => handleModalShow(e)} className='btn btn-outline-primary mb-4' href="">Add Product</a>
            </div>
            <p><b>Filter by Categories</b></p>
            <Checkbox items={categories} name="category" />
            <p className='mt-4'><b>Filter by Brand</b></p>
            <Checkbox items={brands} name="brand" />
          </div>
          <div className="col-lg-9 col-md-9 mt-4 row">
            <div className='col-lg-8 col-md-8 col-sm-12'>
              <Search />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <Order />
            </div>
            <div>
              <Table
                products={products}
                handleModalShow={handleModalShow}
                handleClose={handleClose}
                productList={productList}
              />
            </div>
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                pageLinks={products?.current_displayable_pagination?.page_links}
                next={products?.next_number}
                previous={products?.previous_number}
                getData={(value) => addQuery('page', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddProduct
      show={show}
      handleClose={handleClose}
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      edit={edit}
    />
  </>)
}

export default Products