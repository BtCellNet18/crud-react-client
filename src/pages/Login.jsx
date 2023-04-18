import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Login = () => {
    // State
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // Events
    const handleLogin = async e => {
        try {
            // TODO use form validation for required fields
            if (username && password) {
                setError(null);
                setIsLoading(true);
                let data = await authService.login({ username, password });
                setIsLoading(false);
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    window.location = '/users';
                } else {
                    setError('Invalid username or password!');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    // Template
    return (
        <div className="container">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3>Login</h3>
                </div>
                <div className="panel-body">
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {isLoading && (
                        <div className="d-flex justify-content-center mt-4">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="mt-3">
                        <Link className="btn btn-light" to="/">Cancel</Link>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;