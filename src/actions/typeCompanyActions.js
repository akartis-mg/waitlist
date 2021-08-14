import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Get all company type
export const getTypeCompany = () => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.get('/api/typeCompany/findAllTypeCompany', setHeaders(token))
        .then((typeCompany) => {
            dispatch({
                type: "GET_TYPE_COMPANY",
                typeCompany: {
                    typeCompany: typeCompany.data
                }
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}
