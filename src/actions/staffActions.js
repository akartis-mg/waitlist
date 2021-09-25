import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Add new staff
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

// get manager
export const modifStaff = (dataUpdated) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    //console.log()
    await axios.put('/api/staff/updateStaff', dataUpdated, setHeaders(token))
        .then((staff) => {
            dispatch({
                type: "UPDATE_STAFF",
                staff: staff.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// get manager
export const removeStaff = (id) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    console.log("MY IOD", id)
    await axios.delete(`/api/staff/deleteStaff/${id}`, setHeaders(token))
        .then((staff) => {
            dispatch({
                type: "REMOVE_STAFF",
                staff: staff.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}



