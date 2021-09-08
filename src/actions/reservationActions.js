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
export const getOneReservation = (rid) => async (dispatch, getState) => {
    const token = getState().auth.user.token;
    await axios.get(`/api/reservation/findOneReservation/${rid}`, setHeaders(token))
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


