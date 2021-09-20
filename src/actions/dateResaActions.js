import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Get date resa by branch id
export const getDateResaById = (branchId) => async (dispatch, getState) => {
    let token;
    if (getState().authBusiness.userBusiness.token != null) {
        token = getState().authBusiness.userBusiness.token
    } else {
        token = getState().auth.user.token
    }
    await axios.get(`/api/dateresa/findDateresa/${branchId}`, setHeaders(token))
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


