import useInterCeptor from "./interceptors";


const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        addProduct: (data, params = {}) => axios.post(`api/v1/products/`, data, params),
        productDetails: (id, params = {}) => axios.get(`api/v1/products/${id}`, params),
        productList: (params = {}) => axios.get(`api/v1/products/`, { params: params }),
        updateProduct: (id, data, params = {}) => axios.put(`api/v1/products/${id}/`, data, params),
        deleteProduct: (id, params = {}) => axios.delete(`api/v1/products/${id}/`, params),
        categoryList: (params = {}) => axios.get(`api/v1/category-list/`, { params: params }),
        brandList: (params = {}) => axios.get(`api/v1/brand-list/`, { params: params }),
    }

    return api;
}

export default useApiHelper;