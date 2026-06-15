import React, { useState, useEffect } from 'react';
import { fetchAllEmployees } from '../Services/attendanceService';

const DailyAttendance = () => {  
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5); // Default records per page
    const [error, setError] = useState('');

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await fetchAllEmployees();
                setEmployees(response);
            } catch (err) {
                setError('Failed to fetch employee attendance data.');
            }
        };
        getEmployees();
    }, []);

    // Calculate the current records to display
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employees.slice(indexOfFirstRecord, indexOfLastRecord);

    // Calculate total pages
    const totalPages = Math.ceil(employees.length / recordsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Daily Attendance</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {employees.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table  className="table table-bordered"
                            style={{
                                borderColor: '##4AB1EE', // Table border color
                                borderWidth: '2px', // Border width
                            }}>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Employee ID</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Employee Name</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Designation</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>First Check-In</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Last Check-Out</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Early/Late CheckIn</th>
                                    <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Early/Late CheckOut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map((employee) => (
                                    <tr key={`${employee.employeeId}-${employee.date}`}>
                                        <td>{employee.employeeId}</td>
                                        <td>{employee.employeeName}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.firstCheckIn}</td>
                                        <td>{employee.lastCheckout}</td>
                                        <td>{employee.firstCheckinDiffFrom9am}</td>
                                        <td>{employee.lastCheckoutDiffFrom5pm}</td>
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
            ) : (
                <div className="mt-3">No attendance data available.</div>
            )}
        </div>
    );
};

export default DailyAttendance;
