import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Create new resrevation
export const createReservation = (reservation) => async (dispatch, getState) => {
    const token = getState().auth.user.token;
    await axios.post('/api/reservation/newReservation', reservation, setHeaders(token))
        .then((reservation) => {
            dispatch({
                type: "ADD_RESERVATION",
                reservation: reservation.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Get one reseravtion by its ID
export const getReservationByBranchId = (bid) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.get(`/api/reservation/findReservation/${bid}`, setHeaders(token))
        .then((reservation) => {
            dispatch({
                type: "GET_RESERVATION_BY_ID",
                reservation: reservation.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Update reseravtion
export const updateReservation = (reservation) => async (dispatch, getState) => {
    let token;
    if (getState().authBusiness.userBusiness.token) {
        token = getState().authBusiness.userBusiness.token;
    } else {
        token = getState().auth.user.token;
    }
    await axios.put(`/api/reservation/updateReservation`, reservation, setHeaders(token))
        .then((reservation) => {
            dispatch({
                type: "UPDATE_RESERVATION",
                reservation: reservation.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Get one reseravtion by its ID
export const getAllReservationByUser = (uid) => async (dispatch, getState) => {
    const token = getState().auth.user.token;
    await axios.get(`/api/reservation/findAllReservation/${uid}/customer`, setHeaders(token))
        .then((reservation) => {
            dispatch({
                type: "GET_RESERVATION_BY_USER_ID",
                reservation: reservation.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}