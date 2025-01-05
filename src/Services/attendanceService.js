import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employee';

/**
 * Fetch employee details by ID
 * @param {number} empId - Employee ID to fetch details for
 * @returns {Promise<Object>} - Employee details as a JSON object
 */
export const fetchEmployeeById = async (empId) => {
    try {
        const response = await axios.get(`${API_URL}/${empId}/details`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee details by ID:', error);
        throw error;
    }
};

/**
 * Fetch check-ins by specific date
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Promise<Array>} - List of check-ins and check-outs for the date
 */
export const fetchCheckInsByDate = async (date) => {
    try {
        const response = await axios.get(`${API_URL}/checkins`, {
            params: { date },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching check-ins by date:', error);
        throw error;
    }
};

export const fetchAllEmployees = async () => {
    try {
        const response = await axios.get(`${API_URL}/all/checkin`);
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance by employee:', error);
        throw error;
    }
};


// export const fetchAllEmployees = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/api/employee/all/checkin`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching attendance by employee:', error);
//         throw error;
//     }
// };

