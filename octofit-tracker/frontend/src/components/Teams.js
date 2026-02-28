import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = 'https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev/api/teams/';
        
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Teams API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || data || [];
        setTeams(Array.isArray(teamsList) ? teamsList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading teams...
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
            <h1 className="display-5 fw-bold">👥 Teams</h1>
          </div>
          <div className="col-md-4 text-end">
            <button className="btn btn-primary" type="button">
              <i className="bi bi-plus-circle"></i> Create Team
            </button>
          </div>
        </div>

        {teams.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>No teams found.</strong> Create a team and start competing!
          </div>
        ) : (
          <div className="row">
            {teams.map((team, index) => (
              <div key={team.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">{team.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{team.description || 'No description available'}</p>
                    <div className="mb-3">
                      <span className="badge bg-success me-2">
                        👥 {team.members?.length || 0} Members
                      </span>
                      <span className="badge bg-info">
                        📅 {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-light">
                    <button className="btn btn-sm btn-outline-primary me-2" type="button">View Details</button>
                    <button className="btn btn-sm btn-outline-secondary" type="button">Join</button>
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

export default Teams;
