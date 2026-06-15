import React from 'react';

const AttendanceTable = ({ data }) => {  
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>employeeId</th>
                    <th>employeeName</th>
                    <th>designation</th>
                    <th>FirstCheckIn</th>
                    <th>LastCheckOut</th>
                    <th>firstCheckinDiffFrom9am</th>
                    <th>lastCheckoutDiffFrom5pm</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((record, index) => (
                        <tr key={index}>
                            <td>{record.employeeId}</td>
                            <td>{record.employeeName || 'N/A'}</td>
                            <td>{record.designation || 'N/A'}</td>
                            <td>{record.firstCheckIn || '00:00'}</td>
                            <td>{record.lastCheckout || '00:00'}</td>
                            <td>{record.firstCheckinDiffFrom9am || '00:00'}</td>
                            <td>{record.lastCheckoutDiffFrom5pm || '00:00'}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No Data Found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default AttendanceTable;
