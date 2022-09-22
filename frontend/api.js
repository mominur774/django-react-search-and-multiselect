import useInterCeptor from "./interceptors";


const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        addStudent: (data, params = {}) => axios.post(`api/v1/student/create-student/`, data, params),
        studentDetails: (id, params = {}) => axios.get(`api/v1/student/retrieve-student/${id}`, params),
        studentList: (params = {}) => axios.get(`api/v1/student/student-list/`, { params: params }),
        hobbyList: (params = {}) => axios.get(`api/v1/student/hobby-list/`, { params: params }),
        updateStudent: (id, data, params = {}) => axios.put(`api/v1/student/update-student/${id}/`, data, params),
        deleteStudent: (id, params = {}) => axios.delete(`api/v1/student/delete-student/${id}/`, params)
    }

    return api;
}

export default useApiHelper;