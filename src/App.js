import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src='image.png' className="App-logo" alt="logo" />
          <p>
            Live stream yourself at any platform with Stream Me.
          </p>
          <div><Link to="/signup" className="m-2 mainPage">
            SignUp
          </Link>
          <Link to="/signin" className="m-2 mainPage">
            SignIn
          </Link></div>
        </header>
      </div>
  );
}

export default App;
