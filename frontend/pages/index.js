import React, { useState, useEffect } from "react";
import Select from 'react-select'
import useApiHelper from '../api'
import { makeEnumFriendly } from "../enum";
import StudentList from "../components/Student/StudentList";

export default function Home() {
  const [formData, setFormData] = useState({});
  const [hobby, setHobby] = useState([]);
  const api = useApiHelper();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    api.addStudent(formData).then(res => {
      console.log(res)
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
    <>
      <StudentList />
    </>
  )
}
