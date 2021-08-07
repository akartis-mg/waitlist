import { toast } from 'react-toastify';

const initialState = {
    userBusiness: {
        token: null,
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        _id: null,
        type: null,
        bid: null,
    }
}

const authBusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_BUSINESS":
            toast.success("Welcome...", {
                position: toast.POSITION.BOTTOM_RIGHT
            })

            return {
                ...state,
                userBusiness: {
                    token: action.user.token,
                    firstname: action.user.user.firstname,
                    lastname: action.user.user.lastname,
                    email: action.user.user.email,
                    phone: action.user.user.phone,
                    _id: action.user.user._id,
                    type: action.user.user.type,
                    bid: action.user.user.bid,
                }
            };
        case "REGISTER_BUSINESS":
            return state
        case "LOGOUT_BUSINESS":
            return {
                userBusiness: {
                    token: null,
                    firstname: null,
                    lastname: null,
                    email: null,
                    _id: null,
                    type: null,
                    bid: null,
                }
            }
        default:
            return state;
    }
}

export default authBusinessReducer;