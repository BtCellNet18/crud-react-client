import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import { AuthService } from "./services";
import { Navbar, Home, Login } from "./pages";
import { ListUsers, AddUser, EditUser } from "./users";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  // State
  const [loggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
  // Handlers
  const handleLoginResult = (result) => {
    setLoggedIn(result);
  }
  // Template
  return (
    <div className="App">
        <Navbar loggedIn={loggedIn} setLoginResult={handleLoginResult} />
        <div className="m-5">
          <Routes>
            <Route path="/login" element={<Login setLoginResult={handleLoginResult} />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
