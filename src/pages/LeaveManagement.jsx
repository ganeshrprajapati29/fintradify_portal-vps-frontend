import React from 'react';

const LeaveManagement = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Leave Management</h1>
          <p className="lead text-center">Handle employee leave requests and approvals seamlessly.</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Leave Requests</h5>
            </div>
            <div className="card-body">
              <p>Submit and review leave applications.</p>
              <ul>
                <li>Annual Leave</li>
                <li>Sick Leave</li>
                <li>Maternity Leave</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Approval Process</h5>
            </div>
            <div className="card-body">
              <p>Approve or reject leave requests.</p>
              <ul>
                <li>Manager Approval</li>
                <li>HR Review</li>
                <li>Automated Notifications</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Leave Balance</h5>
            </div>
            <div className="card-body">
              <p>Track remaining leave days.</p>
              <ul>
                <li>Accrued Leaves</li>
                <li>Used Leaves</li>
                <li>Carry Forward</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Leave Calendar</h5>
            </div>
            <div className="card-body">
              <p>View all approved leaves on a calendar.</p>
              <div style={{ height: '300px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Leave Calendar Here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
