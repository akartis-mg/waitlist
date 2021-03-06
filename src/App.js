import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/screens/header/Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./private-routing/PrivateRoute";
import Home from "./components/screens/home/Home";
import Login from "./components/screens/login/Login";
import SignIn from "./components/screens/login/SignIn";
import SignInBusiness from "./components/screens/login/SignInBusiness";
import Contact from "./components/screens/contact/Contact";
import Register from "./components/screens/register/Register";
import Companies from "./components/screens/companies/Companies";
import BookCalendar from "./components/screens/calendars/Calendars";
import RegisterBusiness from "./components/screens/register/RegisterBusiness";
import ListResa from "./components/screens/reservation/ListResa";
import ListResaUser from "./components/screens/reservation/ListResaUser";

function App() {
  const auth = useSelector((state) => state.auth.user);
  const authBusiness = useSelector((state) => state.authBusiness.userBusiness);
  console.log("APP AUTH: ", auth);
  console.log("APP AUTH BUSINESS: ", authBusiness);

  // App.js
  const [theme, setTheme] = useState("light");

  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === "light") {
      setTheme("dark");
      // otherwise, it should be light
    } else {
      setTheme("light");
    }
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/my-reservation">
          <Header />
            <ListResaUser />
          </Route>
          <Route path="/list">
            <ListResa />
          </Route>
          <Route path="/calendar">
            <BookCalendar />
          </Route>

          <Route path="/companies"></Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <SignIn />
          </Route>

          <Route path="/login-business">
            <SignInBusiness />
          </Route>

          <PrivateRoute
            path="/register-business"
            type={
              authBusiness.type == "Superadmin" ? "Authorized" : "Unauthorized"
            }
            user={authBusiness}
            component={RegisterBusiness}
          />

          {/* 
          <Route exact path="/" >
            {!auth.token ? (
              !authBusiness.token ? (
                <Redirect to="/login" />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </Route> */}
        </Switch>

        <Route exact path="/">
          <Header />
          <Companies />
        </Route>
      </Router>
      {/* // Pass the toggle functionality to the button
        <button onClick={toggleTheme}>Toggle theme</button>
        <h1>It's a light theme!</h1>
        <footer>
        </footer> */}
    </div>
  );
}

export default App;
