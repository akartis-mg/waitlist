import { toast } from 'react-toastify';

const initialState = {
    user: {
        token: null,
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        _id: null,
        type: null
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
        case "REGISTER":
            toast.success("Welcome...", {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            return {
                ...state,
                user: {
                    token: action.user.token,
                    firstname: action.user.user.firstname,
                    lastname: action.user.user.lastname,
                    email: action.user.user.email,
                    phone: action.user.user.phone,
                    _id: action.user.user._id,
                    type: action.user.user.type
                }
            };
        case "LOGOUT":
            console.log("REDUCERS")
            return {
                user: {
                    token: null,
                    firstname: null,
                    lastname: null,
                    email: null,
                    _id: null,
                    type: null
                }
            }
        default:
            return state;
    }
}

export default authReducer;