import React from 'react';

const PerformanceReviews = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Performance Reviews</h1>
          <p className="lead text-center">Conduct and manage employee performance evaluations.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Review Cycles</h5>
            </div>
            <div className="card-body">
              <p>Set up annual or quarterly review cycles.</p>
              <ul>
                <li>Self-Assessment</li>
                <li>Manager Review</li>
                <li>360-Degree Feedback</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Goals & Objectives</h5>
            </div>
            <div className="card-body">
              <p>Define and track employee goals.</p>
              <ul>
                <li>SMART Goals</li>
                <li>Progress Tracking</li>
                <li>Achievement Metrics</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Feedback & Ratings</h5>
            </div>
            <div className="card-body">
              <p>Collect and analyze performance feedback.</p>
              <ul>
                <li>Rating Scales</li>
                <li>Comments</li>
                <li>Improvement Plans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Performance Dashboard</h5>
            </div>
            <div className="card-body">
              <p>View overall performance metrics.</p>
              <div style={{ height: '300px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Performance Charts and Analytics Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviews;
