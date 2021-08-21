import { toast } from 'react-toastify';

const staffReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_STAFF":
            return [action.staff, ...state]
        default:
            return state;
    }
}

export default staffReducer;