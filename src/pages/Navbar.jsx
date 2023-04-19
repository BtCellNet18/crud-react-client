import { Link } from "react-router-dom";
import { AuthService } from "../services";

export const Navbar = (props) => {
    // Events
    const handleLogout = () => {
        AuthService.logout();
        props.setLoginResult(false);
    }
    // Template
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="https://react.dev/">React</a>

                <div className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>

                    {props.loggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link to="/users" className="nav-link">Users</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
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
    );
}