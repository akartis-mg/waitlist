import { toast } from 'react-toastify';

const staffReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_STAFF":
            return [action.staff, ...state]
        case "UPDATE_STAFF":
            return action.staff
        case "DELETE_STAFF":
            return action.staff
        default:
            return state;
    }
}

export default staffReducer;