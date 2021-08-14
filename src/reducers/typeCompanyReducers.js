import { toast } from 'react-toastify';

const typeCompanyReducer = (state = [], action) => {
    switch (action.type) {
        case "GET_TYPE_COMPANY":
            console.log("TYPE ACTION: ", action.typeCompany.typeCompany)
            return action.typeCompany.typeCompany;
        default:
            return state;
    }
}

export default typeCompanyReducer;