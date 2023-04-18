import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';

const AddUser = () => {
    // State
    const initialValues = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };

    const navigate = useNavigate();
    const [user, setUser] = useState(initialValues);
    const [loggedIn, setLoggedIn] = useState(false);
    // Effects
    useEffect(() => {
        setLoggedIn(authService.isLoggedIn());
    }, []);
    // Handlers
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleCancel = () => {
        let url = loggedIn ? '/users' : '/';
        navigate(url);
    }

    const handleCreate = () => {
        // TODO use form validation for required fields
        if (user.username && user.password && user.firstName && user.lastName && user.email) {
            userService.create(user)
                .then(() => {
                    let url = loggedIn ? '/users' : '/login';
                    navigate(url);
                });
        }
    }
    // Template
    return (
        <div className="container">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3>Add User</h3>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-3">
                        <button className="btn btn-light" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-success" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddUser;