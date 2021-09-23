import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Add new company
export const addCompany = (company) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.post('/api/company/newCompany', company, setHeaders(token))
        .then((company) => {
            localStorage.setItem('new_company', JSON.stringify(company.data));
            dispatch({
                type: "ADD_COMPANY",
                company: company.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Get all companies
export const getCompanies = () => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.get('/api/company/findAllCompany', setHeaders(token))
        .then((companies) => {
            dispatch({
                type: "GET_ALL_COMPANIES",
                companies
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Update company
export const lele = (company) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.put('/api/company/updateCompany', company, setHeaders(token))
        .then((company) => {
            dispatch({
                type: "UPDATE_COMPANY",
                company
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

