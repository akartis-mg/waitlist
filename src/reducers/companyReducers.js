import { toast } from 'react-toastify';

const companyReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_COMPANY":
            return [action.company, ...state]
        case "GET_ALL_COMPANIES":
            return action.companies.data
        case "UPDATE_COMPANY":
            return state.map((company) => company._id === action.company._id ? action.company : company
            )
        default:
            return state;
    }
}

export default companyReducer;