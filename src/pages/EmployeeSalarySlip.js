import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaDownload, FaFileInvoiceDollar, FaCalendarAlt, FaRupeeSign, FaUser, FaBuilding, FaIdCard } from "react-icons/fa";

const API_URL =
  (process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_API_URL.trim()) ||
  "https://steelblue-sheep-699352.hostingersite.com";

const EmployeeSalarySlip = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔒 StrictMode duplicate call prevention
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchSalaryData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/admin/employee/salary-slip?month=${selectedMonth}&year=${selectedYear}`);
        setSalaryData(res.data.salarySlip);
      } catch (err) {
        console.error("❌ Fetch salary data error:", err.response?.data || err.message);
        setMessage({ type: "error", text: err.response?.data?.msg || "Failed to load salary data" });
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [selectedMonth, selectedYear]);

  const handleDownload = () => {
    // Simple download functionality - in real app, this would generate PDF
    const element = document.getElementById('salary-slip-content');
    const opt = {
      margin: 1,
      filename: `salary-slip-${selectedMonth + 1}-${selectedYear}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // For demo purposes, we'll just show an alert
    alert('Salary slip download feature would be implemented here with PDF generation library');
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  if (loading) {
    return (
      <div className="salary-slip-loading">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading salary slip...</p>
      </div>
    );
  }

  return (
    <div className="salary-slip-container">
      {/* Header */}
      <div className="salary-slip-header">
        <div className="header-content">
          <FaFileInvoiceDollar className="header-icon" />
          <div>
            <h2>Salary Slip</h2>
            <p>View and download your monthly salary details</p>
          </div>
        </div>

        {/* Month/Year Selector */}
        <div className="period-selector">
          <div className="selector-group">
            <label>Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="form-select"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          </div>
          <div className="selector-group">
            <label>Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="form-select"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
          {message.text}
        </div>
      )}

      {/* Salary Slip Content */}
      {salaryData ? (
        <div id="salary-slip-content" className="salary-slip-card">
          {/* Company Header */}
          <div className="slip-header">
            <div className="company-info">
              <h3>{salaryData.companyName || "Corporate Solutions"}</h3>
              <p>Employee Salary Slip</p>
              <p className="period">
                <FaCalendarAlt /> {months[selectedMonth]} {selectedYear}
              </p>
            </div>
            <div className="company-logo">
              <FaBuilding />
            </div>
          </div>

          {/* Employee Details */}
          <div className="employee-details">
            <div className="detail-row">
              <div className="detail-item">
                <FaUser />
                <span><strong>Employee Name:</strong> {salaryData.employeeName}</span>
              </div>
              <div className="detail-item">
                <FaIdCard />
                <span><strong>Employee ID:</strong> {salaryData.employeeId}</span>
              </div>
            </div>
            <div className="detail-row">
              <div className="detail-item">
                <span><strong>Department:</strong> {salaryData.department}</span>
              </div>
              <div className="detail-item">
                <span><strong>Position:</strong> {salaryData.position}</span>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="salary-breakdown">
            <h4>Earnings</h4>
            <div className="salary-table">
              <div className="table-row header">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="table-row">
                <span>Basic Salary</span>
                <span>₹{salaryData.basicSalary?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>HRA</span>
                <span>₹{salaryData.hra?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>Conveyance Allowance</span>
                <span>₹{salaryData.conveyance?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>Medical Allowance</span>
                <span>₹{salaryData.medical?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>LTA</span>
                <span>₹{salaryData.lta?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row total">
                <span><strong>Gross Earnings</strong></span>
                <span><strong>₹{salaryData.grossEarnings?.toLocaleString() || '0'}</strong></span>
              </div>
            </div>

            <h4>Deductions</h4>
            <div className="salary-table">
              <div className="table-row header">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="table-row">
                <span>Provident Fund</span>
                <span>₹{salaryData.pf?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>Professional Tax</span>
                <span>₹{salaryData.professionalTax?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>Income Tax</span>
                <span>₹{salaryData.incomeTax?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row">
                <span>Other Deductions</span>
                <span>₹{salaryData.otherDeductions?.toLocaleString() || '0'}</span>
              </div>
              <div className="table-row total">
                <span><strong>Total Deductions</strong></span>
                <span><strong>₹{salaryData.totalDeductions?.toLocaleString() || '0'}</strong></span>
              </div>
            </div>

            {/* Net Salary */}
            <div className="net-salary">
              <div className="net-amount">
                <span>Net Salary</span>
                <span className="amount">₹{salaryData.netSalary?.toLocaleString() || '0'}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="slip-footer">
            <p>This is a computer-generated salary slip and does not require signature.</p>
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <FaFileInvoiceDollar size={48} />
          <h4>No Salary Data Found</h4>
          <p>Salary slip for the selected period is not available.</p>
        </div>
      )}

      {/* Download Button */}
      {salaryData && (
        <div className="download-section">
          <button className="btn btn-primary download-btn" onClick={handleDownload}>
            <FaDownload /> Download Salary Slip
          </button>
        </div>
      )}

      <style jsx>{`
        .salary-slip-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .salary-slip-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%);
          color: white;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          font-size: 2rem;
          color: #3b82f6;
        }

        .header-content h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .header-content p {
          margin: 0;
          opacity: 0.9;
        }

        .period-selector {
          display: flex;
          gap: 16px;
        }

        .selector-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .selector-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-select {
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.9rem;
        }

        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }

        .salary-slip-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }

        .slip-header {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #e2e8f0;
        }

        .company-info h3 {
          margin: 0;
          color: #1e3a8a;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .company-info p {
          margin: 4px 0;
          color: #64748b;
          font-weight: 500;
        }

        .period {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #059669;
          font-weight: 600;
        }

        .company-logo {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
        }

        .employee-details {
          padding: 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .detail-row:last-child {
          margin-bottom: 0;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #374151;
          font-size: 0.9rem;
        }

        .detail-item svg {
          color: #6b7280;
        }

        .salary-breakdown {
          padding: 24px;
        }

        .salary-breakdown h4 {
          color: #1e3a8a;
          margin-bottom: 16px;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .salary-table {
          margin-bottom: 24px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-row.header {
          background: #f8fafc;
          font-weight: 600;
          color: #374151;
          border-bottom: 2px solid #e2e8f0;
        }

        .table-row.total {
          background: #f0f9ff;
          font-weight: 700;
          color: #1e3a8a;
          border-top: 2px solid #e2e8f0;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .net-salary {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          padding: 20px 24px;
          color: white;
          border-radius: 8px;
          margin-top: 16px;
        }

        .net-amount {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.2rem;
          font-weight: 700;
        }

        .net-amount .amount {
          font-size: 1.5rem;
          color: #fbbf24;
        }

        .slip-footer {
          background: #f8fafc;
          padding: 16px 24px;
          text-align: center;
          border-top: 1px solid #e2e8f0;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .download-section {
          text-align: center;
          margin-top: 24px;
        }

        .download-btn {
          padding: 12px 32px;
          font-size: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          border: none;
          border-radius: 8px;
          color: white;
          transition: all 0.3s ease;
        }

        .download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(5, 150, 105, 0.3);
        }

        .no-data {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-data svg {
          color: #d1d5db;
          margin-bottom: 16px;
        }

        .no-data h4 {
          margin-bottom: 8px;
          color: #374151;
        }

        .salary-slip-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
          gap: 16px;
          color: #6b7280;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: none;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          color: #059669;
          border-left: 4px solid #059669;
        }

        .alert-danger {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          border-left: 4px solid #dc2626;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .salary-slip-header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }

          .period-selector {
            width: 100%;
            justify-content: center;
          }

          .selector-group {
            flex: 1;
            max-width: 140px;
          }

          .detail-row {
            flex-direction: column;
            gap: 8px;
          }

          .table-row {
            flex-direction: column;
            gap: 4px;
            text-align: center;
          }

          .net-amount {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }

          .slip-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .salary-slip-container {
            padding: 16px;
          }

          .salary-slip-header {
            padding: 20px;
          }

          .header-content h2 {
            font-size: 1.3rem;
          }

          .period-selector {
            flex-direction: column;
            gap: 12px;
          }

          .selector-group {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeSalarySlip;
