import { toast } from 'react-toastify';

const branchReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_BRANCH":
            return [action.branch, ...state]
        default:
            return state;
    }
}

export default branchReducer;