import { toast } from 'react-toastify';

const reservationReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_RESERVATION":
            return [action.reservation, ...state]
        case "GET_RESERVATION_BY_ID":
            return action.reservation
        case "UPDATE_RESERVATION":
            console.log("REDUCERS: ", action.reservation);
            return state.map((resa) => resa._id === action.reservation._id ? action.reservation : resa)
        default:
            return state;
    }
}

export default reservationReducer;