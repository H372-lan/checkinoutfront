import React, { useState, useEffect } from 'react';
import { fetchCheckInsByDate } from '../Services/attendanceService';

const DateAttendance = () => {
    const [date, setDate] = useState('');
    const [checkIns, setCheckIns] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(5);

    useEffect(() => {
        // Adjust currentPage when recordsPerPage changes
        const newTotalPages = Math.ceil(checkIns.length / recordsPerPage);
        if (currentPage > newTotalPages) {
            setCurrentPage(newTotalPages);
        }
    }, [recordsPerPage, checkIns.length]);

    const handleSearch = async () => {
        try {
            setError('');
            setCheckIns([]);
            setCurrentPage(1); // Reset to the first page on new search
            const results = await fetchCheckInsByDate(date);
            setCheckIns(results);
        } catch (err) {
            setError('Failed to fetch check-ins. Please check the date and try again.');
        }
    };

    // Pagination Logic
    const totalPages = Math.ceil(checkIns.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = checkIns.slice(indexOfFirstRecord, indexOfLastRecord);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Search Attendance by Date</h3>
            <div className="d-flex justify-content-center mb-3">
            <input
                type="date"
                className="form-control mb-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '20%' }}
            />
            <button className="btn btn-primary mb-3" onClick={handleSearch} disabled={!date} style={{ width: '8%' }}>
                Search
            </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {checkIns.length > 0 ? (
                <>
                    <table  className="table table-bordered"
                            style={{
                                borderColor: '#44E4A9', // Table border color
                                borderWidth: '2px', // Border width
                            }}>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Employee ID</th>
                                <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Employee Name</th>
                                <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Designation</th>
                                <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>First CheckIn</th>
                                <th style={{ backgroundColor: '#4AB1EE', color: '#fff' }}>Last CheckOut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.employeeId}</td>
                                    <td>{entry.employeeName}</td>
                                    <td>{entry.designation}</td>
                                    <td>{entry.firstCheckinDiffFrom9am}</td>
                                    <td>{entry.lastCheckoutDiffFrom5pm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <button
                            className="btn btn-secondary"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span>
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
                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <label htmlFor="recordsPerPage" className="me-2">Records per page:</label>
                        <input
                            type="number"
                            id="recordsPerPage"
                            className="form-control"
                            style={{ width: '80px' }}
                            value={recordsPerPage}
                            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-3">No attendance data available for the selected date.</div>
            )}
        </div>
    );
};

export default DateAttendance;
