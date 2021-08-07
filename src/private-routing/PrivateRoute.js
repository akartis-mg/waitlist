// Check if user is logged in or not
// If user is not logged in (not token in localstorage) then redirect to Login screen

import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, type, user, ...rest }) =>
(
    <Route
        {...rest}
        render={(props) => {
            if (!user.token) {
                return <Redirect to="/" />
            }

            if (type && type == "Authorized") {
                return <Component {...props} />
            } else {
                return <Redirect to="/" />
            }
        }}
    />
);

export default PrivateRoute;