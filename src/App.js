import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { authService } from "./services/auth.service";
import Home from './pages/Home';
import Login from './pages/Login';
import ListUsers from "./users/List";
import AddUser from "./users/Add";
import EditUser from "./users/Edit";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  // State
  const [loggedIn, setLoggedIn] = useState(false);
  // Effects
  useEffect(() => {
    setLoggedIn(authService.isLoggedIn());
  }, []);
  // Handlers
  const handleLogout = () => {
    authService.logout();
  }
  // Template
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="https://react.dev/">React</a>

            <div className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">Users</Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/users/add" className="nav-link">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="m-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
