import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Get date resa by branch id
export const getDateResaById = (dateresa) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.get('/api/dateresa/findDateresa', dateresa, setHeaders(token))
        .then((dateresa) => {
            dispatch({
                type: "GET_DATERESA_BY_ID",
                dateresa: dateresa.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}


