import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const Training = () => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('programs');

  useEffect(() => {
    if (activeTab === 'programs') {
      fetchTrainingPrograms();
    } else {
      fetchEnrollments();
    }
  }, [activeTab]);

  const fetchTrainingPrograms = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/training/programs');
      setTrainingPrograms(response.data);
    } catch (err) {
      setError('Failed to fetch training programs');
      console.error('Error fetching training programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/training/enrollments');
      setEnrollments(response.data);
    } catch (err) {
      setError('Failed to fetch enrollments');
      console.error('Error fetching enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  const enrollInProgram = async (programId) => {
    try {
      await axios.post('/api/training/enroll', { programId });
      alert('Successfully enrolled in the training program!');
      fetchEnrollments();
    } catch (err) {
      alert('Failed to enroll in training program');
      console.error('Error enrolling:', err);
    }
  };

  const markAsCompleted = async (enrollmentId) => {
    try {
      await axios.put(`/api/training/enrollments/${enrollmentId}`, { status: 'Completed' });
      fetchEnrollments();
    } catch (err) {
      alert('Failed to update enrollment status');
      console.error('Error updating enrollment:', err);
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
      <h2 className="mb-4">Training & Development</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'programs' ? 'active' : ''}`}
            onClick={() => setActiveTab('programs')}
          >
            Training Programs
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'my-training' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-training')}
          >
            My Training
          </button>
        </li>
      </ul>

      {activeTab === 'programs' && (
        <div>
          <h4 className="mb-3">Available Training Programs</h4>

          <div className="row">
            {trainingPrograms.length === 0 ? (
              <div className="col-12">
                <p className="text-muted">No training programs available at the moment.</p>
              </div>
            ) : (
              trainingPrograms.map((program) => (
                <div key={program.id} className="col-md-6 mb-4">
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{program.title}</h5>
                      <p className="card-text">{program.description}</p>
                      <div className="mt-auto">
                        <div className="mb-2">
                          <small className="text-muted">
                            Duration: {program.duration} hours
                          </small>
                        </div>
                        <div className="mb-2">
                          <small className="text-muted">
                            Instructor: {program.instructor}
                          </small>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">
                            Start Date: {new Date(program.startDate).toLocaleDateString()}
                          </small>
                        </div>
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => enrollInProgram(program.id)}
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'my-training' && (
        <div>
          <h4 className="mb-3">My Training Enrollments</h4>

          {enrollments.length === 0 ? (
            <p className="text-muted">You haven't enrolled in any training programs yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Program Title</th>
                    <th>Instructor</th>
                    <th>Enrolled Date</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>{enrollment.programTitle}</td>
                      <td>{enrollment.instructor}</td>
                      <td>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
                      <td>
                        <div className="progress" style={{ width: '80px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${enrollment.progress}%` }}
                            aria-valuenow={enrollment.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {enrollment.progress}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          enrollment.status === 'Completed' ? 'bg-success' :
                          enrollment.status === 'In Progress' ? 'bg-primary' :
                          enrollment.status === 'Not Started' ? 'bg-secondary' : 'bg-warning'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td>
                        {enrollment.status !== 'Completed' && (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => markAsCompleted(enrollment.id)}
                          >
                            Mark Complete
                          </button>
                        )}
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

export default Training;
