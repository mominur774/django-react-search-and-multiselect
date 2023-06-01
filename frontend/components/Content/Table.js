import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import useApiHelper from '../../api';
import { ConfirmDelete } from '../Modals';
import { toast } from 'react-toastify';

const Table = (props) => {
  const [deleteId, setDeleteId] = useState(null);
  const [deleteShow, setDeleteShow] = useState(false);

  const api = useApiHelper();

  const handleDeleteModalShow = (id) => {
    setDeleteShow(true);
    setDeleteId(id)
  }

  const handleClose = () => {
    props.handleClose();
    setDeleteShow(false);
  }

  const deleteProduct = id => {
    api.deleteProduct(id).then(res => {
      props.productList();
      handleClose();
      toast.success('Student deleted');
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props?.products?.results?.map((product, index) => (
            <React.Fragment key={product.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand_name}</td>
                <td className='hobby-list'>
                  {product.category_list.length && product.category_list.map((category, index) => (
                    <span key={index}>{category}</span>
                  ))}
                </td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <div
                      style={{ 'color': 'blue', 'cursor': 'pointer' }}
                      onClick={(e) => props.handleModalShow(e, product.id)}
                    >
                      <BiEdit />
                    </div>
                    <div
                      style={{ 'color': 'red', 'cursor': 'pointer' }}
                      onClick={() => handleDeleteModalShow(product.id)}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <ConfirmDelete
        show={deleteShow}
        handleClose={handleClose}
        deleteId={deleteId}
        deleteProduct={deleteProduct}
      />
    </>
  )
}

export default Table