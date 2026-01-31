import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const Recruitment = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('postings');

  useEffect(() => {
    if (activeTab === 'postings') {
      fetchJobPostings();
    } else {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchJobPostings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/recruitment/jobs');
      setJobPostings(response.data);
    } catch (err) {
      setError('Failed to fetch job postings');
      console.error('Error fetching job postings:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/recruitment/applications');
      setApplications(response.data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const createJobPosting = async () => {
    const title = prompt('Enter job title:');
    const description = prompt('Enter job description:');

    if (!title || !description) return;

    try {
      await axios.post('/api/recruitment/jobs', { title, description });
      alert('Job posting created successfully!');
      fetchJobPostings();
    } catch (err) {
      alert('Failed to create job posting');
      console.error('Error creating job posting:', err);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.put(`/api/recruitment/applications/${applicationId}`, { status });
      fetchApplications();
    } catch (err) {
      alert('Failed to update application status');
      console.error('Error updating application:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Recruitment Management</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'postings' ? 'active' : ''}`}
            onClick={() => setActiveTab('postings')}
          >
            Job Postings
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
        </li>
      </ul>

      {activeTab === 'postings' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Job Postings</h4>
            <button
              className="btn btn-primary"
              onClick={createJobPosting}
            >
              Create Job Posting
            </button>
          </div>

          {jobPostings.length === 0 ? (
            <p className="text-muted">No job postings found.</p>
          ) : (
            <div className="row">
              {jobPostings.map((job) => (
                <div key={job.id} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{job.title}</h5>
                      <p className="card-text">{job.description}</p>
                      <div className="mt-auto">
                        <small className="text-muted">
                          Posted: {new Date(job.createdAt).toLocaleDateString()}
                        </small>
                        <br />
                        <small className="text-muted">
                          Applications: {job.applicationCount || 0}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div>
          <h4 className="mb-3">Job Applications</h4>

          {applications.length === 0 ? (
            <p className="text-muted">No applications received yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Applicant Name</th>
                    <th>Email</th>
                    <th>Job Title</th>
                    <th>Applied Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.applicantName}</td>
                      <td>{application.email}</td>
                      <td>{application.jobTitle}</td>
                      <td>{new Date(application.appliedAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${
                          application.status === 'Accepted' ? 'bg-success' :
                          application.status === 'Rejected' ? 'bg-danger' :
                          application.status === 'Under Review' ? 'bg-warning' : 'bg-secondary'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => updateApplicationStatus(application.id, 'Accepted')}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => updateApplicationStatus(application.id, 'Rejected')}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => updateApplicationStatus(application.id, 'Under Review')}
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recruitment;
