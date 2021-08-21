import axios from 'axios';
import { toast } from 'react-toastify'
import { setHeaders } from '../api/headers'

// Add new brach
export const addBranch = (branch) => async (dispatch, getState) => {
    const token = getState().authBusiness.userBusiness.token;
    await axios.post('/api/branch/newBranch', branch, setHeaders(token))
        .then((branch) => {
            localStorage.setItem('new_branch', JSON.stringify(branch.data));
            dispatch({
                type: "ADD_BRANCH",
                branch: branch.data
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}


