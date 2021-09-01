import { toast } from 'react-toastify';

const reservationReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_RESERVATION":
            return [action.reservation, ...state]
        default:
            return state;
    }
}

export default reservationReducer;