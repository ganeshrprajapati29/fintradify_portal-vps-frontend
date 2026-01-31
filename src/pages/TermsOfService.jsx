import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header">
              <h2 className="mb-0">Terms of Service</h2>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h4>1. Acceptance of Terms</h4>
                <p>
                  By accessing and using Fin  HR Portal  you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </p>
              </div>

              <div className="mb-4">
                <h4>2. Use License</h4>
                <p>
                  Permission is granted to temporarily download one copy of the materials on HR Portal Pro
                  for personal, non-commercial transitory viewing only. This is the grant of a license,
                  not a transfer of title, and under this license you may not:
                </p>
                <ul>
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose or for any public display;</li>
                  <li>attempt to reverse engineer any software contained on HR Portal Pro;</li>
                  <li>remove any copyright or other proprietary notations from the materials.</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4>3. User Responsibilities</h4>
                <p>
                  Users are responsible for maintaining the confidentiality of their account and password.
                  You agree to accept responsibility for all activities that occur under your account or password.
                  You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </div>

              <div className="mb-4">
                <h4>4. Service Availability</h4>
                <p>
                  We strive to provide continuous service but do not guarantee that the service will be
                  uninterrupted or error-free. We reserve the right to modify or discontinue the service
                  with or without notice.
                </p>
              </div>

              <div className="mb-4">
                <h4>5. Data Privacy</h4>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs
                  your use of HR Portal Pro, to understand our practices.
                </p>
              </div>

              <div className="mb-4">
                <h4>6. Limitation of Liability</h4>
                <p>
                  In no event shall HR Portal Pro or its suppliers be liable for any damages (including,
                  without limitation, damages for loss of data or profit, or due to business interruption)
                  arising out of the use or inability to use the materials on HR Portal Pro.
                </p>
              </div>

              <div className="mb-4">
                <h4>7. Governing Law</h4>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws
                  of the jurisdiction in which HR Portal Pro operates, and you irrevocably submit to the
                  exclusive jurisdiction of the courts in that state or location.
                </p>
              </div>

              <div className="mb-4">
                <h4>8. Changes to Terms</h4>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                  If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>

              <div className="text-muted">
                <small>Last updated: {new Date().toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
