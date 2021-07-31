import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import Header from './components/screens/header/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/screens/home/Home';
import Login from './components/screens/login/Login';
import Contact from './components/screens/contact/Contact';
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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path="/contact">
              <Header />
              <Contact />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </Router>
        {/* // Pass the toggle functionality to the button
        <button onClick={toggleTheme}>Toggle theme</button>
        <h1>It's a light theme!</h1>
        <footer>
        </footer> */}



      </>
    </ThemeProvider>
  );
}

export default App;
