import { toast } from 'react-toastify';

const companyReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COMPANY":
            return [action.company, ...state]
        case "GET_ALL_COMPANIES":
            return action.companies.data
        default:
            return state;
    }
}

export default companyReducer;