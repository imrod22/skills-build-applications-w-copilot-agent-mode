import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = 'https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev/api/activities/';
        
        console.log('Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Activities API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results || data || [];
        setActivities(Array.isArray(activitiesList) ? activitiesList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading activities...
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
            <h1 className="display-5 fw-bold">Activities</h1>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" type="button">
              <i className="bi bi-plus-circle"></i> Add Activity
            </button>
          </div>
        </div>

        {activities.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>No activities found.</strong> Start logging your workouts!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories Burned</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <th scope="row">{index + 1}</th>
                    <td><span className="badge bg-primary">{activity.name || activity.activity_type}</span></td>
                    <td>{activity.duration || 'N/A'}</td>
                    <td><strong>{activity.calories_burned || 0}</strong></td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1" type="button">Edit</button>
                      <button className="btn btn-sm btn-outline-danger" type="button">Delete</button>
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

export default Activities;
