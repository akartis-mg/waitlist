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
                company: {
                    company: company.data
                }
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}
