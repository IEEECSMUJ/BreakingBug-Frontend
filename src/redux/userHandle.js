import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    stuffAdded,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    productSuccess,
    productDetailsSuccess,
    getProductDetailsFailed,
    getProductsFailed,
    setFilteredProducts,
    getSearchFailed,
    sellerProductSuccess,
    getSellerProductsFailed,
    stuffUpdated,
    updateFailed,
    getCustomersListFailed,
    customersListSuccess,
    getSpecificProductsFailed,
    specificProductSuccess,
    updateCurrentUser,
} from './userSlice';

const baseURL = process.env.REACT_APP_BASE_URL;
const headers = { 'Content-Type': 'application/json' };

export const authUser = (fields, role, mode) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`${baseURL}/${role}${mode}`, fields, { headers });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error.message));
    }
};

export const addStuff = (address, fields) => async (dispatch) => {
    dispatch(authRequest());
    try {
        const result = await axios.post(`${baseURL}/${address}`, fields, { headers });
        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        dispatch(authError(error.message));
    }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {
    try {
        const result = await axios.put(`${baseURL}/${address}/${id}`, fields, { headers });
        if (result.data.message) {
            dispatch(updateFailed(result.data.message));
        } else {
            dispatch(stuffUpdated());
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const deleteStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.delete(`${baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const updateCustomer = (fields, id) => async (dispatch) => {
    try {
        dispatch(updateCurrentUser(fields));
        await axios.put(`${baseURL}/CustomerUpdate/${id}`, fields, { headers });
        dispatch(stuffUpdated());
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getProductsbySeller = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/getSellerProducts/${id}`);
        if (result.data.message) {
            dispatch(getSellerProductsFailed(result.data.message));
        } else {
            dispatch(sellerProductSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getProducts = () => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/getProducts`);
        if (result.data.message) {
            dispatch(getProductsFailed(result.data.message));
        } else {
            dispatch(productSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/getProductDetail/${id}`);
        if (result.data.message) {
            dispatch(getProductDetailsFailed(result.data.message));
        } else {
            dispatch(productDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getCustomers = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getCustomersListFailed(result.data.message));
        } else {
            dispatch(customersListSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getSpecificProducts = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getSpecificProductsFailed(result.data.message));
        } else {
            dispatch(specificProductSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};

export const getSearchedProducts = (address, key) => async (dispatch) => {
    dispatch(getRequest());
    try {
        const result = await axios.get(`${baseURL}/${address}/${key}`);
        if (result.data.message) {
            dispatch(getSearchFailed(result.data.message));
        } else {
            dispatch(setFilteredProducts(result.files));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
};
