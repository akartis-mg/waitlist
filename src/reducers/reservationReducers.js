import { toast } from 'react-toastify';

const reservationReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_RESERVATION":
            return [action.reservation, ...state]
        case "GET_RESERVATION_BY_ID":
            return action.reservation
        case "UPDATE_RESERVATION":
            return action.reservation
        default:
            return state;
    }
}

export default reservationReducer;