import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { userService } from '../services/user.service';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // State
    const initialValues = {
        id: id,
        firstName: '',
        lastName: '',
        email: ''
    };

    const [user, setUser] = useState(initialValues);
    // Effects
    useEffect(() => {
        userService.getById(id)
            .then(user => setUser(user));
    }, [id]);
    // Events
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = () => {
        // TODO use form validation for required fields
        if (user.firstName && user.lastName && user.email) {
            console.log(user);

            userService.update(id, user)
                .then(() => {
                    navigate('/users');
                });
        }
    }
    // Template
    return (
        <div className="container">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3>Edit User</h3>
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
                    <div className="mt-3">
                        <Link className="btn btn-light" to="/users">Cancel</Link>
                        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EditUser;