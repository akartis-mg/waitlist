import { toast } from 'react-toastify';

const companyReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COMPANY":
            return [action.company, ...state]
        default:
            return state;
    }
}

export default companyReducer;