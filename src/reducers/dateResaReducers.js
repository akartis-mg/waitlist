import { toast } from 'react-toastify';

const dateResaReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_DATERESA_BY_ID":
            return action.dateresa
        default:
            return state;
    }
}

export default dateResaReducer;