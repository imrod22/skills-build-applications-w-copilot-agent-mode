import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  console.log('OctoFit Tracker App Initialized');
  console.log('Backend API: https://shiny-rotary-phone-wg5775gw6j7294ww-8000.app.github.dev');

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/logo.png" alt="OctoFit Logo" height="40" className="me-2" />
              <span className="fw-bold fs-4">OctoFit Tracker</span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto gap-2">
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded-2" to="/activities">
                    📋 Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded-2" to="/leaderboard">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded-2" to="/teams">
                    👥 Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded-2" to="/users">
                    👤 Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3 rounded-2" to="/workouts">
                    💪 Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="hero-section">
                  <div className="container">
                    <div className="row align-items-center min-vh-100">
                      <div className="col-md-6">
                        <h1 className="display-4 fw-bold mb-4">Welcome to OctoFit Tracker</h1>
                        <p className="lead mb-4">
                          Track your activities, compete with others, and achieve your fitness goals!
                        </p>
                        <p className="mb-4">
                          Use the navigation menu to explore different sections and start your fitness journey.
                        </p>
                        <div className="d-flex gap-3">
                          <Link to="/activities" className="btn btn-primary btn-lg">
                            Get Started
                          </Link>
                          <Link to="/leaderboard" className="btn btn-outline-primary btn-lg">
                            View Leaderboard
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6 text-center">
                        <div className="feature-icons">
                          <div className="feature-card">
                            <div className="feature-icon">📋</div>
                            <h5>Log Activities</h5>
                          </div>
                          <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h5>Compete</h5>
                          </div>
                          <div className="feature-card">
                            <div className="feature-icon">👥</div>
                            <h5>Join Teams</h5>
                          </div>
                          <div className="feature-card">
                            <div className="feature-icon">💪</div>
                            <h5>Train</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-4 mt-5 border-top border-secondary">
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6 className="fw-bold mb-2">About OctoFit</h6>
                <p className="small text-muted">Your personal fitness companion</p>
              </div>
              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Quick Links</h6>
                <div className="d-flex flex-column gap-1">
                  <Link to="/" className="text-white-50 text-decoration-none small">Home</Link>
                  <Link to="/activities" className="text-white-50 text-decoration-none small">Activities</Link>
                  <Link to="/leaderboard" className="text-white-50 text-decoration-none small">Leaderboard</Link>
                </div>
              </div>
              <div className="col-md-4">
                <h6 className="fw-bold mb-2">Community</h6>
                <div className="d-flex justify-content-center gap-3">
                  <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-twitter"></i></a>
                  <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="text-white-50 text-decoration-none"><i className="bi bi-instagram"></i></a>
                </div>
              </div>
            </div>
            <hr className="border-secondary" />
            <p className="mb-0 small text-white-50">&copy; 2026 OctoFit Tracker. All rights reserved. Made with 💚 for fitness enthusiasts.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
