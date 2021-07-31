import axios from 'axios';
import { toast } from 'react-toastify'

// Login
export const login = (credentials) => async (dispatch) => {
    await axios.post('/api/auth/login', credentials)
        .then(token => {
            dispatch({
                type: "LOGIN",
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
export const register = (user) => async (dispatch) => {
    axios.post('/api/auth/register', user)
        .then(token => {
            dispatch({
                type: "REGISTER",
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
export const logout = () => {
    return (dispatch) => {
        dispatch({
            type: "LOGOUT",
        })
    }
}
