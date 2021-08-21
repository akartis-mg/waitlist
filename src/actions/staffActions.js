import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Add new brach
export const addStaff = (staff) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.post('/api/staff/newStaff', staff, setHeaders(token))
        .then((staff) => {
            dispatch({
                type: "ADD_STAFF",
                staff: staff.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}


