import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = 'https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev/api/leaderboard/';
        
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log('Leaderboard API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || data || [];
        setLeaderboard(Array.isArray(leaderboardList) ? leaderboardList : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Loading leaderboard...
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
        <h1 className="display-5 fw-bold mb-4">🏆 Leaderboard</h1>

        {leaderboard.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <strong>No leaderboard data found.</strong> Be the first to compete!
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col" className="text-center" style={{ width: '80px' }}>🥇 Rank</th>
                  <th scope="col">User</th>
                  <th scope="col" className="text-center">⭐ Points</th>
                  <th scope="col" className="text-center">📊 Activities</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index} className={index < 3 ? 'table-warning' : ''}>
                    <td className="text-center fw-bold">
                      {index === 0 ? '🥇 1st' : index === 1 ? '🥈 2nd' : index === 2 ? '🥉 3rd' : index + 1}
                    </td>
                    <td>
                      <span className="badge bg-primary">
                        {entry.user?.username || entry.user_name || 'Unknown'}
                      </span>
                    </td>
                    <td className="text-center">
                      <strong className="text-success">{entry.points || entry.total_points || 0}</strong>
                    </td>
                    <td className="text-center">{entry.activity_count || 0}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-outline-primary" type="button">View Profile</button>
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

export default Leaderboard;
