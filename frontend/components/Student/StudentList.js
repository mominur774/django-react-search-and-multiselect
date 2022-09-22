import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';
import { BiEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai'
import CreateStudentModal from '../Modals/CreateStudentModal';
import ConfirmDelete from '../Modals/ConfirmDeleteModal';
import { useToasts } from 'react-toast-notifications';
import { makeEnumFriendly } from '../../enum';
import { useRouter } from 'next/router';
import Pagination from '../Pagination/Pagination';

const StudentList = () => {
  const api = useApiHelper();
  const { addToast } = useToasts();
  const router = useRouter();

  const [students, setStudents] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [checked, setChecked] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const studentList = () => {
    api.studentList(router.query).then(res => {
      setStudents(res)
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
    setDeleteShow(false);
  }

  const handleModalShow = (e, id = '') => {
    e.preventDefault();
    setShow(true)

    if (id) {
      setEdit(true);
      api.studentDetails(id).then(res => {
        setFormData(res)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const handleDeleteModalShow = (id) => {
    setDeleteShow(true);
    setDeleteId(id)
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
      api.addStudent(formData).then(res => {
        handleClose();
        studentList();
        addToast('Student added Successfully', { appearance: 'success' });
      }).catch(error => {
        console.log(error)
      })
    } else {
      api.updateStudent(id, formData).then(res => {
        handleClose();
        studentList();
        addToast('Student updated Successfully', { appearance: 'success' });
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const deleteStudent = id => {
    api.deleteStudent(id).then(res => {
      studentList();
      handleClose();
      addToast('Student deleted', { appearance: 'warning' });
    }).catch(error => {
      console.log(error)
    })
  }

  const handleCheckbox = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
    delete router.query.page
    router.push({
      pathname: '',
      query: { ...router.query, 'hobby': updatedList }
    })
  }
  const handleSearch = e => {
    setSearchInput(e.target.value)
  }
  const submitSearch = () => {
    delete router.query.page
    router.push({
      pathname: '',
      query: { ...router.query, 'search': searchInput }
    })

  }


  useEffect(() => {
    studentList();
  }, [router.query])

  useEffect(() => {
    api.hobbyList().then(res => {
      setHobby(makeEnumFriendly(res))
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
              <a onClick={(e) => handleModalShow(e)} className='btn btn-outline-primary mb-4' href="">Add Student</a>
            </div>
            <p><b>Filter by hobbies</b></p>
            {hobby.length && hobby.map(hb => (
              <div key={hb.id}>
                <input
                  type="checkbox"
                  name={hb.name}
                  value={hb.value}
                  onChange={handleCheckbox}

                /> {hb.label}
              </div>
            ))}
          </div>
          <div className="col-lg-9 col-md-9 mt-4">
            <div>
              <div className="input-group w-50 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder='Search...'
                  onChange={handleSearch}
                />
                <span
                  style={{ 'cursor': 'pointer' }}
                  className="input-group-text"
                  onClick={submitSearch}
                >
                  <AiOutlineSearch />
                </span>
              </div>
            </div>
            <table className='table'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Interested In</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students?.results?.map(student => (
                  <React.Fragment key={student.id}>
                    <tr>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.address}</td>
                      <td className='hobby-list'>
                        {student.hobby_list.length && student.hobby_list.map((hobby, index) => (
                          <span key={index}>{hobby}</span>
                        ))}
                      </td>
                      <td>
                        <div className='d-flex justify-content-around'>
                          <div
                            style={{ 'color': 'blue', 'cursor': 'pointer' }}
                            onClick={(e) => handleModalShow(e, student.id)}
                          >
                            <BiEdit />
                          </div>
                          <div
                            style={{ 'color': 'red', 'cursor': 'pointer' }}
                            onClick={() => handleDeleteModalShow(student.id)}
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
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                pageLinks={students?.current_displayable_pagination?.page_links}
                next={students?.next_number}
                previous={students?.previous_number}
                getData={(value) => addQuery('page', value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <CreateStudentModal
      show={show}
      handleClose={handleClose}
      handleChange={handleChange}
      formData={formData}
      handleSubmit={handleSubmit}
      edit={edit}
    />

    <ConfirmDelete
      show={deleteShow}
      handleClose={handleClose}
      deleteId={deleteId}
      deleteStudent={deleteStudent}
    />
  </>)
}

export default StudentList