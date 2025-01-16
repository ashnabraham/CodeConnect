const fs = require('fs');

class EmployeeService {
    constructor() {
        this.filePath = "employees.json";
    }

    // Helper function to read Employees from JSON file
    readEmployees() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading Employees:', err);
            return [];
        }
    }

    // Helper function to write Employees to JSON file
    writeEmployees(employees) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(employees, null, 2), 'utf8');
        } catch (err) {
            console.error('Error writing Employees:', err);
        }
    }

    // Get all Employees
    getAllEmployees() {
        return this.readEmployees();
    }

    // Get a employee by ID
    getEmployeeById(id) {
        const employees = this.readEmployees();
        return employees.find(employee => employee.id === id);
    }

    // Update an employee by ID
    updateEmployee(id, updatedEmployee) {
        const employees = this.readEmployees();
        const employeeIndex = employees.findIndex(employee => employee.id === id);
        if (employeeIndex === -1) return null;

        employees[employeeIndex] = { ...employees[employeeIndex], ...updatedEmployee };
        this.writeEmployees(employees);
        return employees[employeeIndex];
    }
}

module.exports = EmployeeService;
