import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/screens/header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/screens/home/Home';
import Login from './components/screens/login/Login';
import SignIn from './components/screens/login/SignIn';

import Contact from './components/screens/contact/Contact';
import Register from './components/screens/register/Register'
import Companies from './components/screens/companies/Companies';
import BookCalendar from './components/screens/calendars/Calendars';
function App() {

  // App.js
  const [theme, setTheme] = useState('light');

  // The function that toggles between themes
  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
      // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }
  return (

    <div>

      <Router>
        <Switch>
          <Route path="/calendar">

            <BookCalendar />
          </Route>

          <Route path="/companies">
            <Header />
            <Companies />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
          <Route path="/contact">
            <Header />
            <Contact />
          </Route>
          <Route path="/login">
            <SignIn />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Contact />
          </Route>
        </Switch>
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
