import React, { useState } from 'react';
import { fetchEmployeeById } from '../Services/attendanceService';

const EmployeeDetails = () => {
    const [empId, setEmpId] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const [error, setError] = useState('');
    const [basicInfo, setBasicInfo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5); // Default records per page
    const [modalVisible, setModalVisible] = useState(false);
    const [checkInData, setCheckInData] = useState([]);

    const handleSearch = async () => {
        try {
            setError('');
            setEmployeeDetails([]);
            setBasicInfo(null);

            const details = await fetchEmployeeById(empId);

            if (details.length > 0) {
                // Extract basic employee info from the first record
                const { employeeId, employeeName, designation } = details[0];
                setBasicInfo({ employeeId, employeeName, designation });

                // Set detailed employee data
                setEmployeeDetails(details);
            } else {
                setError('No records found for the provided Employee ID.');
            }
        } catch (err) {
            setError('Failed to fetch employee details. Please check the ID and try again.');
        }
    };

    const fetchCheckInData = async (empId, date) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${empId}/checkins?date=${date}`);
            const data = await response.json();
            setCheckInData(data);
        } catch (err) {
            console.error('Failed to fetch check-in data', err);
        }
    };

    const handleViewDetailsClick = (empId, date) => {
        fetchCheckInData(empId, date);
        setModalVisible(true); // Show modal
        document.body.classList.add('blur-background'); // Add blur effect
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Hide modal
        document.body.classList.remove('blur-background'); // Remove blur effect
    };

    // Pagination Logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employeeDetails.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(employeeDetails.length / recordsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-3">
            <h3>Search Employee by ID</h3>
            <div className="d-flex justify-content-center mb-3">
                {/* Set 20% width for input and button */}
                <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Enter Employee ID"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    style={{ width: '20%' }}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    disabled={!empId}
                    style={{ width: '8%' }}
                >
                    Search
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {basicInfo && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">Employee Name: {basicInfo.employeeName}</h5>
                        <p className="card-text">Employee ID: {basicInfo.employeeId}</p>
                        <p className="card-text">Designation: {basicInfo.designation}</p>
                    </div>
                </div>
            )}
            {employeeDetails.length > 0 && (
                <>
                    <div className="table-responsive mt-3">
                        <table  className="table table-bordered"
                            style={{
                                borderColor: '#44E4A9', // Table border color
                                borderWidth: '2px', // Border width
                            }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Date</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>First Check-In</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Last Check-Out</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Early/Late CheckIn</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Early/Late Checkout</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>View Details</th> {/* Add new column for View Details */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((detail, index) => (
                                    <tr key={index}>
                                        <td>{detail.date}</td>
                                        <td>{detail.firstCheckIn}</td>
                                        <td>{detail.lastCheckout}</td>
                                        <td>{detail.firstCheckinDiffFrom9am}</td>
                                        <td>{detail.lastCheckoutDiffFrom5pm}</td>
                                        <td>
                                            <button
                                                className="btn btn-link"
                                                onClick={() => handleViewDetailsClick(detail.employeeId, detail.date)}
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                        <button
                            className="btn btn-secondary mb-2 mb-md-0"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span className="text-center mb-2 mb-md-0">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            className="btn btn-secondary"
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-end align-items-center mt-3">
                        <label htmlFor="recordsPerPage" className="me-md-2">Records per page:</label>
                        <input
                            type="number"
                            id="recordsPerPage"
                            className="form-control"
                            style={{ maxWidth: '100px' }}
                            value={recordsPerPage}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (value > 0) {
                                    setRecordsPerPage(value);
                                    setCurrentPage(1); // Reset to first page on records change
                                }
                            }}
                        />
                    </div>
                </>
            )}

            {/* Modal for displaying check-in details */}
            {modalVisible && (
                <div className="modal" style={{
                    display: 'block',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    overflowY: 'auto', // Prevent body scroll
                }}>
                    <div
                        className="modal-content"
                        style={{
                            width: '30%',
                            margin: '0 auto',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            position: 'relative',
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            maxHeight: '80vh', // Restrict modal height
                            overflowY: 'auto', // Make content scrollable
                        }}
                    >
                        <span
                            onClick={handleCloseModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                fontSize: '30px',
                                cursor: 'pointer',
                                color: '#333',
                                fontWeight: 'bold',
                                transition: 'color 0.3s'
                            }}
                        >
                            ×
                        </span>
                        <h4>Check-in Details</h4>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkInData.map((item) => (
                                    <tr key={item.checkInOutId}>
                                        <td>{item.checkInDate}</td>
                                        <td>{item.checkInTime}</td>
                                        <td>{item.checkOutTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
