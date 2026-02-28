import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = 'https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev/api/users/';
        
        console.log('Fetching Users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Users API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersList = data.results || data || [];
        setUsers(Array.isArray(usersList) ? usersList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">👤 Users</h1>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" type="button">
              <i className="bi bi-plus-circle"></i> Add User
            </button>
          </div>
        </div>

        {users.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>No users found.</strong> Start by registering new users!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Join Date</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td><span className="badge bg-primary">{user.username}</span></td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </td>
                    <td>{user.first_name || 'N/A'} {user.last_name || 'N/A'}</td>
                    <td>{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary me-1" type="button">View</button>
                      <button className="btn btn-sm btn-outline-secondary" type="button">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
