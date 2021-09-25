import { toast } from 'react-toastify';

const branchReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_BRANCH":
            return [action.branch, ...state]
        case "UPDATE_BRANCH":
            return state.map((branch) => branch._id === action.branch._id ? action.branch : branch
            )
        default:
            return state;
    }
}

export default branchReducer;