import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthService, UserService } from '../services';

export const AddUser = () => {
    // State
    const initialValues = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    };
    const [user, setUser] = useState(initialValues);
    const [success, setSuccess] = useState(false);
    const [cancelUrl, setCancelUrl] = useState('/');
    const [createlUrl, setCreateUrl] = useState('/login');
    // Effects
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            setCancelUrl('/users');
            setCreateUrl('/users');
        }
    }, []);
    // Handlers
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = () => {
        // TODO use form validation for required fields
        if (user.username && user.password && user.firstName && user.lastName && user.email) {
            UserService.create(user).then(setSuccess(true));
        }
    }
    // Template
    if (success) { 
        return <Navigate to={createlUrl} />
    }
    
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
                        <Link className="btn btn-light" to={cancelUrl}>Cancel</Link>
                        <button className="btn btn-success" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}