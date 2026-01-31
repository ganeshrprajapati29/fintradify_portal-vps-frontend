import React from 'react';

const Onboarding = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Onboarding</h1>
          <p className="lead text-center">Welcome new employees and ensure smooth integration.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Pre-Onboarding</h5>
            </div>
            <div className="card-body">
              <p>Prepare for new hires before their start date.</p>
              <ul>
                <li>Offer Acceptance</li>
                <li>Paperwork Preparation</li>
                <li>Equipment Setup</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>First Day</h5>
            </div>
            <div className="card-body">
              <p>Facilitate a smooth first day experience.</p>
              <ul>
                <li>Office Tour</li>
                <li>Team Introductions</li>
                <li>System Access</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Training & Development</h5>
            </div>
            <div className="card-body">
              <p>Provide necessary training and resources.</p>
              <ul>
                <li>Company Policies</li>
                <li>Role-Specific Training</li>
                <li>Mentorship Programs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Onboarding Checklist</h5>
            </div>
            <div className="card-body">
              <p>Track completion of onboarding tasks.</p>
              <div style={{ height: '300px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Onboarding Progress Tracker Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
