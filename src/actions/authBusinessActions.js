import axios from 'axios';
import { toast } from 'react-toastify'

// Login
export const loginBusiness = (credentials) => async (dispatch) => {
    console.log("LOGIN BUSINESS")
    await axios.post('/api/authBusiness/login', credentials)
        .then(token => {
            dispatch({
                type: "LOGIN_BUSINESS",
                user: {
                    token: token.data.token,
                    user: token.data.user,
                }
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}

// Register
export const registerBusiness = (user) => async (dispatch) => {
    axios.post('/api/authBusiness/register', user)
        .then(token => {
            dispatch({
                type: "REGISTER_BUSINESS",
                user: {
                    token: token.data.token,
                    user: token.data.user,
                }
            })
        })
        .catch(error => {
            toast.error(error.response?.data, {
                position: toast.POSITION.BOTTON_RIGHT
            });
        })
}


// Logout
export const logoutBusiness = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT_BUSINESS",
        })
    }
}
