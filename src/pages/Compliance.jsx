import React from 'react';

const Compliance = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Compliance</h1>
          <p className="lead text-center">Ensure organizational adherence to laws, regulations, and internal policies.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Regulatory Compliance</h5>
            </div>
            <div className="card-body">
              <p>Monitor compliance with external regulations.</p>
              <ul>
                <li>Labor Laws</li>
                <li>Data Protection</li>
                <li>Industry Standards</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Internal Policies</h5>
            </div>
            <div className="card-body">
              <p>Enforce company policies and procedures.</p>
              <ul>
                <li>Code of Conduct</li>
                <li>Anti-Harassment</li>
                <li>Confidentiality Agreements</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Audits & Reporting</h5>
            </div>
            <div className="card-body">
              <p>Conduct compliance audits and generate reports.</p>
              <ul>
                <li>Risk Assessments</li>
                <li>Compliance Reports</li>
                <li>Corrective Actions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Compliance Dashboard</h5>
            </div>
            <div className="card-body">
              <p>Track compliance status and metrics.</p>
              <div style={{ height: '300px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Compliance Metrics and Alerts Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
