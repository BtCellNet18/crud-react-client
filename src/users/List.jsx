import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/user.service';

const ListUsers = () => {
    // State
    const [users, setUsers] = useState(null);
    // Effects
    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);
    // Events
    const handleDelete = (user) => {
        if (window.confirm(`Delete user ${user.id} Are you sure?`)) {
            userService.delete(user.id).then(() => { 
                userService.getAll().then(x => setUsers(x));
            });   
        }
    }  
    // Template
    return (
        <div className="container">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-md-10">
                            <h3>List Users</h3>
                        </div>
                        <div className="col-md-2">
                            <a className="btn btn-success" href="/users/add">Add</a>                            
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users && users.map(user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td><Link className="btn btn-primary" to={`/users/edit/${user.id}`}>Edit</Link></td>
                                    <td><button className="btn btn-danger" onClick={() => handleDelete(user)}>Delete</button></td>
                                </tr>
                            )}	
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListUsers;