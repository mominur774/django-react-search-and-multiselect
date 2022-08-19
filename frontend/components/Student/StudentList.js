import React, { useState, useEffect } from 'react';
import useApiHelper from '../../api';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import CreateStudentModal from '../Modals/CreateStudentModal';
import ConfirmDelete from '../Modals/ConfirmDeleteModal';
import { useToasts } from 'react-toast-notifications';
import { makeEnumFriendly } from '../../enum';

const StudentList = () => {
  const api = useApiHelper();
  const { addToast } = useToasts();

  const [students, setStudents] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [edit, setEdit] = useState(false);
  const [deleteId, setDeleteId] = useState({});

  const studentList = () => {
    api.studentList().then(res => {
      setStudents(res)
    })
  }

  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setFormData({});
    setDeleteShow(false);
  }

  const handleModalShow = (id = '') => {
    setShow(true)

    if (id) {
      setEdit(true)
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
    console.log({ [e.target.name]: e.target.value })
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
        console.log(res)
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

  useEffect(() => {
    studentList();
  }, [])

  useEffect(() => {
    api.hobbyList().then(res => {
      setHobby(makeEnumFriendly(res))
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (<>
    <div className='row'>
      <div className="col-lg-8 mx-auto">
        <Link href="#">
          <a onClick={() => handleModalShow()} className='btn btn-outline-primary my-3' href="">Add Student</a>
        </Link>
        <table className='table mt-3'>
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
            {students.map(student => (
              <React.Fragment key={student.id}>
                <tr>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td className='hobby-list'>
                    {hobby.length && hobby.map(hb => (
                      student.hobby.map(hb_id => {
                        return (
                          hb.id === hb_id &&
                          <span key={hb.id}> {hb.name} </span>
                        )
                      })
                    ))}
                  </td>

                  <td className='d-flex justify-content-around'>
                    <div
                      style={{ 'color': 'blue', 'cursor': 'pointer' }}
                      onClick={() => handleModalShow(student.id)}
                    >
                      <BiEdit />
                    </div>
                    <div
                      style={{ 'color': 'red', 'cursor': 'pointer' }}
                      onClick={() => handleDeleteModalShow(student.id)}
                    >
                      <FaTrash />
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <CreateStudentModal
      show={show}
      handleClose={handleClose}
      handleChange={handleChange}
      formData={formData}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
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