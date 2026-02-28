import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = 'https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev/api/workouts/';
        
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Workouts API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || data || [];
        setWorkouts(Array.isArray(workoutsList) ? workoutsList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading workouts...
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

  const getDifficultyBadge = (difficulty) => {
    const level = (difficulty || '').toLowerCase();
    if (level === 'easy') return 'bg-success';
    if (level === 'medium') return 'bg-warning';
    if (level === 'hard') return 'bg-danger';
    return 'bg-secondary';
  };

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="display-5 fw-bold">💪 Workouts</h1>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" type="button">
              <i className="bi bi-plus-circle"></i> Create Workout
            </button>
          </div>
        </div>

        {workouts.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>No workouts found.</strong> Create your first workout!
          </div>
        ) : (
          <div className="row">
            {workouts.map((workout, index) => (
              <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">{workout.name || workout.workout_type}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{workout.description || 'No description available'}</p>
                    <div className="mb-3">
                      <span className="badge bg-info me-2">⏱️ {workout.duration || 'N/A'} min</span>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                        {workout.difficulty || 'N/A'}
                      </span>
                    </div>
                    <small className="text-muted">
                      📅 {workout.created_at ? new Date(workout.created_at).toLocaleDateString() : 'N/A'}
                    </small>
                  </div>
                  <div className="card-footer bg-light">
                    <button className="btn btn-sm btn-outline-primary me-2" type="button">View</button>
                    <button className="btn btn-sm btn-outline-success" type="button">Start</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
