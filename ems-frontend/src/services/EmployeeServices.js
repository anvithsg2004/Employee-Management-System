import axios from "axios";

const BASE_URL = 'http://localhost:8080/employee';

// Fetch all employees
export const listEmployees = () => {
    return axios.get(`${BASE_URL}/getAllEmployee`);
}

// Add a new employee
export const createEmployee = (employee) => {
    return axios.post(`${BASE_URL}/addEmployee`, employee);
}

// Get employee details by ID (for updating)
export const getEmployeeById = (employeeId) => {
    return axios.get(`${BASE_URL}/getEmployee/${employeeId}`);
}

// Update an existing employee
export const updateEmployee = (employeeId, employee) => {
    return axios.put(`${BASE_URL}/updateEmployee/${employeeId}`, employee);
}

// Delete an employee by ID
export const deleteEmployee = (employeeId) => {
    return axios.delete(`${BASE_URL}/deleteEmployee/${employeeId}`);
}
